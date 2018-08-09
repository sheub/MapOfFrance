import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import MAP_STYLE from './mbstyle/style.json';
import VillagesIcon from './mbstyle/icons/village-11.svg';
// import MuseumIcon from './mbstyle/icons/museum-11.svg';
// import UnescoIcon from './mbstyle/icons/World_Heritage_Logo_global_small.svg';


const defaultMapStyle = fromJS(MAP_STYLE);
const categories = ['Unesco', 'Villages', 'Museum', 'APO', 'Jardins', 'GSF'];

// Layer id patterns by category
const layerSelector = {
  Museum: /listeetlocalisationdesmuseesdefrance/,
  Villages: /villages-frenchcorrected-3gqhy6/,
  Unesco: /whs-frenchcorrected-dq63pv/,
  APO: /n-inao-aop-fr-16md1w/,
  Jardins: /jardinfr-8nabpa/,
  GSF: /gsf-frenchcorrected/

};

const defaultContainer = ({ children }) => <div className="control-panel">{children}</div>;

export default class StyleControls extends PureComponent {
  constructor(props) {
    super(props);

    this._defaultLayers = defaultMapStyle.get("layers");
    this.state = { visibility: { Museum: true, Villages: true, Unesco: true, APO: false, Jardins: true, GSF: true } };
  }

  componentDidMount() {
    this._updateMapStyle(this.state);
  }

  _onVisibilityChange(name, event) {
    const visibility = { ...this.state.visibility, [name]: event.target.checked };
    this.setState({ visibility });
    this._updateMapStyle({
      ...this.state,
      visibility
    });
  }

  _updateMapStyle({ visibility }) {
    const layers = this._defaultLayers.filter(
      layer => {
        const id = layer.get("id");
        return categories.every(
          name =>
            visibility[name] ||
            !layerSelector[name].test(id)
        );
      }
    );

    this.props.onChange(defaultMapStyle.set("layers", layers));
  }

  _renderLayerControl(name) {
    const { visibility } = this.state;

    return <div key={name} className="input">
      <img src={VillagesIcon} className="controlPanelIcon" alt="" />
      <label> {name}</label>
      <input type="checkbox" checked={visibility[name]} onChange={this._onVisibilityChange.bind(this, name)} />
    </div>;
  }

  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return <Container>
      <p>Display/hide map layers.</p>
      <hr />
      {categories.map(name =>
        this._renderLayerControl(name)
      )}
    </Container>;
  }
}