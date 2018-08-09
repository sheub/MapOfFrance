import React, { PureComponent } from "react";
import Truncate from 'react-truncate';


function ShowOpeningHours(props) {
  if (!props.info.startTime) {
    return null;
  }

  return (
    <div>
      Horaires: <br />
      StartTime {props.info.startTime}<br />
      EndTime: {props.info.endTime}<br />
    </div>
  );
}

export default class CityInfo extends PureComponent {
  render() {
    const { info, layerId } = this.props;
    var displayName = info.label;
    if (layerId.includes('aop')) {
      return (
        <div style={popPupStyle}>
          <div style={baseText}>
            {info.aire_geo}
          </div>
        </div>
      );
    }
    if (displayName && info.link) {
      return (
        <div style={popPupStyle}>
          <div style={baseText}>
            <a target="_new" href={info.link} style={titleText}>{displayName}</a><br />
          </div>
          <img src={info.thumbnail} style={picturePoppup} alt={info.label} />
          <div style={baseText}>
            <Truncate lines={9} ellipsis={<span>... <a href={info.link}>More</a></span>}>
              {info.abstract}
            </Truncate>
          </div>
        </div>
      );
    }
    else if (displayName) {
      return (
        <div style={popPupStyle}>
          <div>
            <div style={baseText}>
              <div style={titleText}>
                {displayName}<br />
              </div>
              <div>
                {info.abstract}<br />
                {"validFrom:"}<br />
                {"StartDate: "}{info.validFrom}<br />
                <ShowOpeningHours info={info} />

                {"Address:"}<br />
                {info.streetAddress}<br />
                {info.postalCode}{" "}{info.addressLocality}<br />

              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      displayName = info.nom_du_musee;
      var link = null;
      if (info.sitweb) {
        link = info.sitweb.includes("http://") ? info.sitweb : "http://" + info.sitweb;
      }
      return (
        <div style={popPupStyle}>
          <div>
            <div style={baseText}>
              <div style={titleText}>
                {displayName}<br />
              </div>
              <div>
                {info.adr}<br />
                {info.cp}{" "}{info.ville}<br />
                {"Ouverture:"}<br />
                {info.periode_ouverture}
              </div>
            </div>
            <a target="_new" href={link}>Site internet</a>
          </div>
        </div>
      );
    }
  }
}

const baseText = {
  fontFamily: 'Cochin',
  width: 228,
  marginLeft: 6,
  marginBottom: 6,
  marginTop: 6


};

const titleText = {
  fontSize: 20,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'black',
};

const picturePoppup = {
  width: 240,
  paddingTop: 3
};

const popPupStyle = {
  maxWidth: 240,
  padding: 0
};


