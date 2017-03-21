import React from 'react';
import { Component } from 'react';
import CommentBox from './comment_box';
import CommentList from './comment_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>React simple starter</div>
        <CommentBox />
        <CommentList />
      </div>
    );
  }
}
