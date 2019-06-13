
import React, { Component } from 'react';

export default class ArticlePagination extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
            <div className="pagination">
                <span>&laquo;</span>
                <span className="active-page">1</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
            </div>
    );
  }
}
