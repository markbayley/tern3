import React from "react";
import "./App.css";
import "./index.css";
import { CONFIG } from "./config.js";
import { Map, TileLayer } from "react-leaflet";
// import Wkt from 'wicket';
// import wkt_coords from 'wicket';
import "bootstrap/dist/css/bootstrap.min.css";
// import { DateRangePicker } from 'react-date-range';
/* import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file */
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Col, Row } from "react-bootstrap";
import SearchBar from "./components/test/SearchBar";
import DateRange from "./components/DateRange";
import BreadCrumb from "./components/BreadCrumb";
import SearchEngine from "./components/bio-search/SearchEngine";
import ImageSearchEngine from "./components/bio-image-search/ImageSearchEngine";
import ImageMarkerEngine from "./components/bio-image-marker/ImageMarkerEngine";
import Favourite from "./components/bio-favourites/Favourite";
import Toggle from "./components/buttons/Toggle";
import MapNav from "./components/MapNav";
import FavouriteHeader from "./components/bio-favourites/FavouriteHeader";
import FilterHeader from "./components/bio-image-search/FilterHeader";
import { Link, scroller, animateScroll as scroll } from "react-scroll";

import { FeatureGroup, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Search from "./components/Search";
import TopHeader from "./components/TopHeader";

// const base_image_url =
//   "https://swift.rc.nectar.org.au/v1/AUTH_05bca33fce34447ba7033b9305947f11/";

/*Photo Gallery*/
/*Photo Gallery Item*/
/*Filter SideBar*/
/*Filter SideBar Item*/

// function Favourite(props) {
//   return (
//     <li key="{index}">
//       {" "}
//       <button onClick={props.onClick}>
//         {props.value.user_id} {props.value.favourite_name} (
//         {props.value.favourites_id})
//       </button>
//     </li>
//   );
// }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      favourites: [],
      filters: {},
      hits: [],
      images: null,
      error: null,
      isLoading: true,
      isLoadingSearch: true,
      search: {},
      selectedFilter: {},
      aggregation: null,
      lat: -26.47,
      lng: 134.02,
      zoom: 5,
    };
  }

  /*handleSelect(ranges) {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }*/

  fetchFavourites() {
    // Where we're fetching data from
    fetch(CONFIG.API_BASE_URL + "favourites")
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) =>
        this.setState({
          favourites: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  fetchSearch() {
    // Where we're fetching data from
    console.log("Fetching Data now .....");
    var search_url = CONFIG.API_BASE_URL + "search?1=1";
    const selectedFilter = this.state.selectedFilter;
    for (const [key, value] of Object.entries(selectedFilter)) {
      search_url += "&" + key + "=" + value;
    }

    console.log("ES API. search_url" + search_url);

    fetch(search_url)
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) =>
        this.setState({
          search: data,
          hits: data["hits"],
          filters: data["aggregations"],
          isLoadingSearch: false,
          aggregation: data["aggregation"],
        })
      )
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    //this.fetchFavourites()
    this.fetchSearch();
  }

  filterSiteID(id) {
    this.setState({ selectedFilter: { site_id: id } });
    console.log("clicked marker", this.state);
  }

  resetFilter() {
    this.setState({ selectedFilter: { site_id: {} } });
    console.log("clicked refresh button", this.state);
  }

  handleFilter(i) {
    const selectedFilter = this.state.selectedFilter;

    console.log("selectedFilter(i)", i);
    var arr = i.split("=");
    selectedFilter[arr[0]] = arr[1];
    if (arr[0] !== "_id") {
      selectedFilter["_id"] = "";
    }
    this.state.selectedFilter = selectedFilter;
    console.log(i);
    this.fetchSearch();
    console.log(this.state.isLoadingSearch);
    //console.log(args[0]);
    //alert(i);  //image_type=photopoint
  }

  handleFavourite(i) {
    const favourites = this.state.favourites;

    console.log(i);
    //console.log(args[0]);
    alert(i); //image_type=photopoint
  }

  render() {
    const { favourites } = this.state;
    const favs = favourites.map((favourite, index) => {
      return (
        <Favourite
          user_id={favourite.user_id}
          favourite_name={favourite.favourite_name}
          favourite_id={favourite.favourite_id}
          index={index}
          key={"f" + index}
          handleFavourite={() => this.handleFavourite(favourite.favourite_name)}
        />
      );
    });

    const position = [this.state.lat, this.state.lng];
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };

    return (
      <div id="map">
        <TopHeader />
        <Search />

        <Row>
          {/*Filter SideBar*/}
          <Col
            className="filterbar"
            xl={2}
            style={{ zIndex: "9", margin: "0", paddingRight: "0" }}
          >
            <FilterHeader
              resetFilter={() => {
                this.resetFilter();
              }}
            />
            <ImageSearchEngine
              imageFilters={this.state.filters}
              handleFilter={(i) => {
                console.log("clicked the facet", this.props, this.state);
                this.handleFilter(i);
              }}
            />

            <DateRange />
            <FavouriteHeader />
            <Favourite />
          </Col>

          {/*Leaflet Map */}
          <Col
            sm={12}
            md={12}
            lg={10}
            xl={10}
            style={{
              height: "80vh",
              padding: "0%",
              margin: "0%",
            }}
          >
            <div className="map-container">
              <div className=" map-frame">
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                  crossOrigin=""
                />
                <div id="map-id">
                  <Map
                    className="markercluster-map"
                    center={position}
                    zoom={this.state.zoom}
                    style={{ zIndex: "1" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />

                    <TileLayer
                      attribution='&copy; <a href="http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png">OpenStreetMap</a> contributors'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    <TileLayer
                      attribution='&copy; <a href="http://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />

                    <FeatureGroup>
                      <EditControl
                        position="topright"
                        onEdited={this._onEditPath}
                        onCreated={this._onCreate}
                        onDeleted={this._onDeleted}
                      />
                      <Circle center={[51.51, -0.06]} radius={200} />
                    </FeatureGroup>

                    {/* API Markers */}
                    {Object.keys(this.state.hits).map((index) => (
                      <ImageMarkerEngine
                        value={this.state.hits[index]}
                        location={index}
                        key={index}
                        onClick={() => {
                          console.log(
                            "clicked the marker",
                            this.props,
                            this.state
                          );
                          this.handleFilter("site_id=" + index);
                          // scroller.scrollTo("gallery", {
                          //   duration: 1000,
                          //   smooth: true,
                          // });
                        }}
                      />
                    ))}
                  </Map>
                </div>
              </div>
              {/*End of Leaflet  Map */}

              <BreadCrumb />

              {/*Photo Gallery */}
              <div id="gallery"></div>
              <SearchEngine
                bioImageDocuments={this.state.hits}
                aggregation={this.state.aggregation}
                onBioImageClick={(i) => {
                  console.log("clicked the image", this.props, this.state);
                  this.handleFilter(i);
                }}
              />
            </div>
            <ul>{favs}</ul>
          </Col>
        </Row>

        <Toggle />

        <Footer />
      </div>
    );
  }
}

export default App;
