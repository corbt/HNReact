// Formats text from the very basic subset of HTML allowed in HN comments

import React, { Component, Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Parser } from 'parse5';
import WebIntent from 'react-native-webintent';

const textStyles = StyleSheet.create({
  i: {fontStyle: 'italic'},
  b: {fontWeight: 'bold'},
  a: {
    color: 'blue',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: 'blue',
  },
})

function formatNode(node, index) {
  switch(node.nodeName) {
    case "#text":
      return node.value;
    case "i":
    case "b":
      return <Text key={index} style={[textStyles[node.nodeName]]}>{node.childNodes.map((n, i) => formatNode(n, i))}</Text>;
    case "a":
      return <Text key={index}
                   onPress={() => WebIntent.open(node.attrs.filter(attr => attr.name == 'href')[0].value) }
                   style={[textStyles.a]}>
                   {node.childNodes.map((n, i) => formatNode(n))}
              </Text>;
  }
}

export default class FormattedText extends Component {
  constructor() {
    super();
    this.state = { parser: new Parser() };
  }

  render() {
    // Translate <p> to two newlines. This brings it in line with how HN
    // uses the <p> tag in practice.
    const processedText = this.props.children
      .replace(/^<p>/, "")
      .replace(/<p>/g, "\n\n");
    const parsedText = this.state.parser.parseFragment(processedText);
    return <Text style={this.props.style}>{parsedText.childNodes.map((n, i) => formatNode(n, i))}</Text>;
  }
}
