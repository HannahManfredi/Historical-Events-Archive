import React from 'react';

export default class Data extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dataNodes = this.props.data.map((node, index) => {
      return <div key={index}>
        <ul>
          <li>{node.date}</li>
          <li>{node.category2}</li>
          <li>{node.description}</li>
        </ul>
      </div>;
    });
    return (
      <div id="project-comments" className="data">
        {dataNodes}
      </div>
    );
  }
}