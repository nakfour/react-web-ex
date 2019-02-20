import React, { Component } from 'react';
import './App.css';

class App extends Component {
  apiUrl = "/api/status";
  state = {
    requestInProgress: false,
    responseUrl: null,
    responseStatus: null,
    responseStatusText: null,
    responseBody: null
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    console.log(`fetch data from ${this.apiUrl}`);
    this.setState({requestInProgress: true}, () => {
      fetch(this.apiUrl)
        .then(async response => {
          console.log(response);
          let responseBody = null;
          let responseUrl = response.url;
          let responseStatus = response.status;
          let responseStatusText = response.statusText;
          if (response.ok) {
            responseBody = await response.json();
          }
          // let responseBody = await response.json();
          this.setState({
            requestInProgress: false,
            responseUrl,
            responseStatus,
            responseStatusText,
            responseBody
          });
        });
      // .then(response => response.json())
      // .then(response => {
      //     this.setState({requestInProgress: false, response});
      // })
    });
  };

  render() {
    let {requestInProgress, responseUrl, responseStatus, responseStatusText, responseBody} = this.state;

    let responseSection = <div className="response-text">No Request</div>;

    if (requestInProgress) {
      responseSection = <div className="response-text">Request in Progress</div>;
    } else if (responseStatus) {
      responseSection = (
        <div className="response-text">
          <div className="code-section"><span className="code-label">URL:</span> <code className="code-value">{responseUrl}</code></div>
          <div className="code-section"><span className="code-label">STATUS:</span> <code className="code-value">{responseStatus} {responseStatusText}</code></div>
          {responseBody ? <div className="code-section"><div className="code-label">Body:</div><pre className="code-value">{JSON.stringify(responseBody, undefined, 2)}</pre></div> : ""}
        </div>);
    }

    return (
      <div className="App">
        <h3>API URL: {this.apiUrl}</h3>
        {responseSection}


        <button
          type="button"
          onClick={this.fetchData}
        ><i className="fa fa-undo"/> Fetch Data
        </button>
      </div>
    );
  }
}

export default App;
