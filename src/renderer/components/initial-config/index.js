import Store from 'electron-store';
import React from 'react';

import { SpotifyDownloader } from '../../../main/spotdl.js';

const store = new Store();

export class InitialConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pythonBinary: '',
      spotdlScript: '',
      submitDisabled: true,
      formProcessed: false
    };

    this.handleChangePython = this.handleChangePython.bind(this);
    this.handleChangeSpotdl = this.handleChangeSpotdl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePython(event) {
    const pythonBinary = event.target.value;
    const submitDisabled = !(pythonBinary && this.state.spotdlScript);
    this.setState({
      pythonBinary,
      submitDisabled
    });
  }

  handleChangeSpotdl(event) {
    const spotdlScript = event.target.value;
    const submitDisabled = !(spotdlScript && this.state.pythonBinary);
    this.setState({
      spotdlScript,
      submitDisabled
    });
  }

  handleSubmit(event) {
    this.setState({formProcessed: true});
    store.set('python_binary', this.state.pythonBinary);
    store.set('spotdl_script', this.state.spotdlScript);
    window.spotifyDownloader = new SpotifyDownloader(store.get('python_binary'), store.get('spotdl_script'));
    event.preventDefault();
  }

  render() {
    if (this.state.formProcessed || (store.get('python_binary') && store.get('spotdl_script'))) return null;
    return (
      <div id="initial-config">
        <form onSubmit={this.handleSubmit} className="p-20">
          <input type="text" value={this.state.pythonBinary} onChange={this.handleChangePython} placeholder="Path to Python executable" className="mb-40 block full-width" />
          <input type="text" value={this.state.spotdlScript} onChange={this.handleChangeSpotdl} placeholder="Path to spotdl.py script" className="mb-40 block full-width" />
          <input type="submit" value="Save" disabled={this.state.submitDisabled} className="bg-green fg-light block centered" />
        </form>
      </div>
    );
  }
}
