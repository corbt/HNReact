/* @flow */

import React, { Component, View, WebView, Text, ToolbarAndroid, TouchableNativeFeedback, ScrollView, StyleSheet, ListView } from 'react-native';
import Immutable from 'immutable';
import { connect } from 'react-redux/native';
import WebIntent from 'react-native-webintent';

import Article from './article';

import ItemSummary from '../components/ItemSummary';
import FormattedText from '../components/FormattedText';
import HeaderScrollView from '../components/HeaderScrollView';
import { requestStory } from '../state/actions';
import timeAgo from '../helpers/TimeAgo';

class Comment extends Component {
  props: {
    comment: Immutable.Map,
    topLevel: boolean
  };
  static defaultProps: {};

  constructor() {
    super();
    this.state = { collapsed: false };
  }

  render() {
    return (<TouchableNativeFeedback onPress={() => this.setState({collapsed: !this.state.collapsed})} onLongPress={() => console.log("long!!!")}>
      <View style={[commentStyles.commentBase, this.props.topLevel && commentStyles.commentTopLevel]}>
        <View style={{flexDirection: 'row', paddingBottom: 5}}>
          <Text style={{flex: 1, fontSize: 15, color: '#bf223f', fontWeight: 'bold'}}>{this.props.comment.get('user')}</Text>
          <Text>{timeAgo(this.props.comment.get('time'))}</Text>
        </View>
        <View style={this.state.collapsed && {height: 40}}>
          <View style={this.state.collapsed && {opacity: 0.1}}>
            <FormattedText style={{color: 'black', fontSize: 17}}>{this.props.comment.get('content')}</FormattedText>
            <View style={{paddingLeft: 10, paddingBottom: 10}}>
              {this.props.comment.get('comments').map(c => <Comment comment={c} key={c.get('id')} />)}
            </View>
          </View>
          {this.state.collapsed &&
            <View style={{position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 30}}>&bull;&bull;&bull;</Text>
            </View>
          }
        </View>
      </View>
    </TouchableNativeFeedback>);
  }
}

class Comments extends Component {
  props: {
    story: Immutable.Map,
    dispatch: any,
    navigator: any
  };
  static defaultProps: {};

  constructor(props) {
    super(props);
    props.dispatch(requestStory(props.story.get('id')));

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  showStory(story: Immutable.Map) {
    WebIntent.open(story.get('url'));

    // this.props.navigator.push({
    //   component: Article,
    //   passProps: { story }
    // });
  }

  render() {
    const dataSource = this.state.dataSource.cloneWithRows((this.props.story.get('comments') || Immutable.List()).toArray());

    return <HeaderScrollView style={{flex: 1}} header={<ItemSummary story={this.props.story} showStory={this.showStory.bind(this)} back={() => this.props.navigator.pop()}/>}>
        <ListView style={{flex: 1}} dataSource={dataSource} renderRow={comment =>
          <Comment comment={comment} key={comment.get('id')} topLevel={true} /> }>
        </ListView>
      </HeaderScrollView>;
  }
}

const commentStyles = StyleSheet.create({
  commentBase: {
    paddingTop: 10,
    backgroundColor: 'white'
  },
  commentTopLevel: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
})

function mapStateToProps(state) {
  // return { story: Immutable.fromJS({"id":10257305,"title":"Introducing Brotli: a new compression algorithm for the internet","points":83,"user":"rey12rey","time":1442909660,"time_ago":"3 hours ago","type":"link","url":"http://google-opensource.blogspot.com/2015/09/introducing-brotli-new-compression.html?m=0","domain":"google-opensource.blogspot.com","comments":[{"id":10257766,"level":0,"user":"rottyguy","time":1442919034,"time_ago":"2 minutes ago","content":"<p>I&#x27;m curious about the viability of the following approach.  Can a generic static dictionary be made to be held on the client side such that said compressor&#x2F;decompressor can utilize efficiently? This would prevent the need to send along the dictionary with the compressed package every time. Even at an 80&#x2F;20 - 90&#x2F;10 success rate (of course we&#x27;d have a fall back to worse case), wouldn&#x27;t this be a great advancement and reduce massive network load?  With modern hd sizes, many could spare a few gigabites which could be dialed up&#x2F;down as necessary depending on how optimized you&#x27;d want it.  I would think we could identify particular binary patterns based on the users xfer habits (eg downloading text vs application vs audio vs video) and have different dictionaries optimized to their usage (eg roku would just store dictionaries maximized for video usage)","comments":[]},{"id":10257694,"level":0,"user":"tmd83","time":1442917461,"time_ago":"29 minutes ago","content":"<p>It&#x27;s fantastic to see so much fascinating work in compression these days after a fair amount of stagnation. I know there had been a lot of specialized but codec work but the recent discoveries are very much for wide use.<p>You now have LZ4, Brotil, zstd, snappy, lzfse, lzma all pretty useful practical codec.<p>Brotil is interesting though. It can be an easy replacement for zlib at level 1 with fairly higher compression then zlib at similar speed.<p>On the other hand with with lzma it can handily beat lzma but with an even slower compression rate (from the levels that they published in the benchmark) but on the other hand with much higher decompression speed meaning its very good for distribution work. It would be interesting to see the compression ratio, time for levels between 1-9.<p>It&#x27;s actually a much easier replacement for zlib then lzma for some. The benchmark shows only level 1,9 and 11. It seems that it can handily beat lzma but at the cost of compression speed (I wonder who use more memory). Then again its decompression speed is so much better making it a perfect choice for distribution.<p>What truly surprise me though is the work of &#x27;Yann Collet&#x27;. A single person so handily beating google&#x27;s snappy. Even his zstd work looks ground breaking. When I read couple of weeks ago that he was a part time hobby programmer I just didn&#x27;t know how to be suitably impressed.<p>Am I reading right that apples lzfse is based of a mix of lz+zstd?","comments":[]},{"id":10257591,"level":0,"user":"simonlindholm","time":1442915222,"time_ago":"an hour ago","content":"<p>Currently being implemented in Firefox: <a href=\"https:&#x2F;&#x2F;bugzilla.mozilla.org&#x2F;show_bug.cgi?id=366559\" rel=\"nofollow\">https:&#x2F;&#x2F;bugzilla.mozilla.org&#x2F;show_bug.cgi?id=366559</a>","comments":[{"id":10257708,"level":1,"user":"gjm11","time":1442917691,"time_ago":"25 minutes ago","content":"<p>Note that this bug originally seems to have been called something like &quot;Implement LZMA compression&quot;, and the early comments are about that; it&#x27;s some way in that someone says &quot;oh, and Google have this new Brotli thing which might be even better&quot;.","comments":[]}]},{"id":10257654,"level":0,"user":"fsiefken","time":1442916690,"time_ago":"41 minutes ago","content":"<p>&quot;We hope that this format will be supported by major browsers&quot; - if I&#x27;m not mistaken it should also be implemented by all major webservers. I&#x27;m hoping Opera open sources or sells their OMPD proxy platform. Someone made a chrome extension which interfaces with their network and the speed is amazing. OMPD is a tradeoff and breaks certain javascript and css and is different from Opera Turbo, I am not sure what compression Turbo uses currently. Does anyone know if Brotli gets implemented in the google server and proxy compression? <a href=\"http:&#x2F;&#x2F;browsingthenet.blogspot.nl&#x2F;2014&#x2F;09&#x2F;chrome-data-compression-proxy-vs-mozilla-janus-vs-opera-turbo.html\" rel=\"nofollow\">http:&#x2F;&#x2F;browsingthenet.blogspot.nl&#x2F;2014&#x2F;09&#x2F;chrome-data-compre...</a>","comments":[]},{"id":10257474,"level":0,"user":"estefan","time":1442912843,"time_ago":"2 hours ago","content":"<p>&gt; Just like Zopfli, the new algorithm is named after Swiss bakery products. Brötli means ‘small bread’ in Swiss German.<p>Makes sense.","comments":[{"id":10257631,"level":1,"user":"TazeTSchnitzel","time":1442915977,"time_ago":"an hour ago","content":"<p>Disappointing they aren&#x27;t dissolving the umlaut and instead stripping it. &#x27;Broetil&#x27; would be equivalent to &#x27;Brötil&#x27;, yet they remove it (and thus change the sound) to create &#x27;Brotil&#x27;.","comments":[{"id":10257772,"level":2,"user":"agumonkey","time":1442919105,"time_ago":"a minute ago","content":"<p>Keeping that long human linguistic tradition of information loss. Pretty on point for a compression scheme.","comments":[]},{"id":10257666,"level":2,"user":"m_mueller","time":1442916909,"time_ago":"38 minutes ago","content":"<p>First I thought you made a typo, but then it was consistent: Swiss German it is Bröt<i>li</i>.","comments":[]}]}]},{"id":10257588,"level":0,"user":"kccqzy","time":1442915096,"time_ago":"an hour ago","content":"<p>Really like how big and influential companies are working on foundational technologies like compression, which smaller companies would have no chance of popularising. Earlier this summer Apple introduced lzfse. But this brotli seems even more amazing as its compression ratio seems to match that of lzma. Wonderful.","comments":[]},{"id":10257670,"level":0,"user":"jacobolus","time":1442917012,"time_ago":"36 minutes ago","content":"<p>So how does it compare to Apple’s new proprietary LZFSE codec (<a href=\"http:&#x2F;&#x2F;forums.macrumors.com&#x2F;attachments&#x2F;lzfse_1-png.565004&#x2F;\" rel=\"nofollow\">http:&#x2F;&#x2F;forums.macrumors.com&#x2F;attachments&#x2F;lzfse_1-png.565004&#x2F;</a>), and what’s the Weissman score?","comments":[]},{"id":10257540,"level":0,"user":"dwb","time":1442914218,"time_ago":"an hour ago","content":"<p>So it should be &quot;Broetli&quot;, then...?","comments":[{"id":10257755,"level":1,"user":"wodenokoto","time":1442918870,"time_ago":"5 minutes ago","content":"<p>Yes and no. It is very common to simply strip umlauts and dashes when converting to ASCII compatible writing.<p>I even do it with my name most of the times. A Chinese official that sees Ø in my passport won&#x27;t understand why I write &#x27;OE&#x27;, and might even start questioning if it is the same name, but &#x27;O&#x27; never fails.<p>Airlines can read the gibberish in the bottom of my passport and see that the transliteration is actually &#x27;OE&#x27;, but most places don&#x27;t have a scanner for that.","comments":[]},{"id":10257677,"level":1,"user":"dot","time":1442917146,"time_ago":"34 minutes ago","content":"<p>Can&#x27;t wait for Gipfeli","comments":[]}]},{"id":10257526,"level":0,"user":"cslmy","time":1442913873,"time_ago":"an hour ago","content":"<p>Pied Piper is that you?","comments":[{"id":10257572,"level":1,"user":"orblivion","time":1442914826,"time_ago":"an hour ago","content":"<p>No, it&#x27;s Hooli beating them to the punch.","comments":[]},{"id":10257561,"level":1,"user":"anc84","time":1442914632,"time_ago":"an hour ago","content":"<p>What is that Pied Piper thing I constantly see referenced somewhere? Some SF or startup meme?","comments":[{"id":10257573,"level":2,"user":"wingerlang","time":1442914872,"time_ago":"an hour ago","content":"<p>It&#x27;s from a TV series called Silicon Valley.<p><a href=\"https:&#x2F;&#x2F;en.wikipedia.org&#x2F;wiki&#x2F;Silicon_Valley_(TV_series)\" rel=\"nofollow\">https:&#x2F;&#x2F;en.wikipedia.org&#x2F;wiki&#x2F;Silicon_Valley_(TV_series)</a>","comments":[{"id":10257760,"level":3,"user":"wolfgke","time":1442918972,"time_ago":"3 minutes ago","content":"<p>Being German I thought you meant the Pied Piper of Hamelin (<a href=\"https:&#x2F;&#x2F;en.wikipedia.org&#x2F;wiki&#x2F;Pied_Piper_of_Hamelin\" rel=\"nofollow\">https:&#x2F;&#x2F;en.wikipedia.org&#x2F;wiki&#x2F;Pied_Piper_of_Hamelin</a>).","comments":[]},{"id":10257662,"level":3,"user":"acqq","time":1442916818,"time_ago":"39 minutes ago","content":"<p>What&#x27;s the point of mentioning a fictional compression startup as a comment on the algorithm made by Google?<p>To tell the world that he also watched the series?","comments":[{"id":10257674,"level":4,"user":"valarauca1","time":1442917126,"time_ago":"34 minutes ago","content":"<p>&gt;What&#x27;s the point of mentioning a fictional compression startup as a comment on the algorithm made by Google?<p>A joke, or a pop culture reference. Stating a shared experience that others may also gleam some enjoyment out of, or to create the illusion of a shared community&#x2F;experience to help maintain the illusion that we are not just meaningless souls adrift in an indifferent, eternal void, who&#x27;s incomprehensible size only re-enforces the meaninglessness of our existence.<p>But like I said. A joke.","comments":[]},{"id":10257672,"level":4,"user":"wingerlang","time":1442917041,"time_ago":"36 minutes ago","content":"<p>One one hand I understand it, pop culture references has been a thing for ages and ages. On the other hand, I don&#x27;t know because many take it to an extreme (see: reddit).","comments":[]},{"id":10257746,"level":4,"user":"teddyh","time":1442918590,"time_ago":"10 minutes ago","content":"<p>“<i>References to a shared culture are the universal language of camaraderie.</i>”<p><a href=\"http:&#x2F;&#x2F;tailsteak.com&#x2F;archive.php?num=29\" rel=\"nofollow\">http:&#x2F;&#x2F;tailsteak.com&#x2F;archive.php?num=29</a>","comments":[]},{"id":10257715,"level":4,"user":"StavrosK","time":1442917867,"time_ago":"22 minutes ago","content":"<p>Yes, exactly. It&#x27;s the sort of thing that tends to get downvoted here.","comments":[]}]}]},{"id":10257575,"level":2,"user":"kristofferR","time":1442914894,"time_ago":"an hour ago","content":"<p><a href=\"http:&#x2F;&#x2F;www.piedpiper.com&#x2F;\" rel=\"nofollow\">http:&#x2F;&#x2F;www.piedpiper.com&#x2F;</a>","comments":[]},{"id":10257569,"level":2,"user":"PickledJesus","time":1442914779,"time_ago":"an hour ago","content":"<p><a href=\"https:&#x2F;&#x2F;en.wikipedia.org&#x2F;wiki&#x2F;Silicon_Valley_(TV_series)\" rel=\"nofollow\">https:&#x2F;&#x2F;en.wikipedia.org&#x2F;wiki&#x2F;Silicon_Valley_(TV_series)</a>","comments":[]},{"id":10257623,"level":2,"user":"return0","time":1442915884,"time_ago":"an hour ago","content":"<p><a href=\"http:&#x2F;&#x2F;www.piedpiper.com&#x2F;\" rel=\"nofollow\">http:&#x2F;&#x2F;www.piedpiper.com&#x2F;</a>  , almost got owned by <a href=\"http:&#x2F;&#x2F;www.hooli.com&#x2F;\" rel=\"nofollow\">http:&#x2F;&#x2F;www.hooli.com&#x2F;</a>  (who is now owned by homicide? I must have missed a few episodes.)","comments":[]},{"id":10257582,"level":2,"user":"shard","time":1442915032,"time_ago":"an hour ago","content":"<p>It&#x27;s the name of the compression start-up in the show Silicon Valley.","comments":[]},{"id":10257576,"level":2,"time":1442914914,"time_ago":"an hour ago","content":"[deleted]","deleted":true,"comments":[]}]},{"id":10257542,"level":1,"user":"raverbashing","time":1442914227,"time_ago":"an hour ago","content":"<p>Does it compress data middle-out?","comments":[{"id":10257619,"level":2,"user":"return0","time":1442915789,"time_ago":"an hour ago","content":"<p>&gt; The higher data density is achieved by a 2nd order context modeling, re-use of entropy codes, larger memory window of past data and joint distribution codes.<p>They still haven&#x27;t cracked middle out...","comments":[]}]},{"id":10257688,"level":1,"user":"pibefision","time":1442917408,"time_ago":"29 minutes ago","content":"<p>Russ Hanneman says: &quot;ROI guys, ROI...&quot;","comments":[]}]},{"id":10257578,"level":0,"time":1442914953,"time_ago":"an hour ago","content":"[deleted]","deleted":true,"comments":[]},{"id":10257533,"level":0,"time":1442914060,"time_ago":"an hour ago","content":"[deleted]","deleted":true,"comments":[]},{"id":10257592,"level":0,"user":"kornakiewicz","time":1442915268,"time_ago":"an hour ago","content":"<p>&quot;We hope that this format will be supported by major browsers in the near future, as the smaller compressed size would give additional benefits to mobile users, such as lower data transfer fees and reduced battery use.&quot;<p>Is this the same story everytime that G. invents something, implements it in Chrome and then gains advantage, because takes it as standard and other browser hadn&#x27;t implement it yet?","comments":[{"id":10257614,"level":1,"user":"lorenzhs","time":1442915678,"time_ago":"an hour ago","content":"<p>No, this was first proposed for inclusion in Firefox two years ago: <a href=\"https:&#x2F;&#x2F;groups.google.com&#x2F;forum&#x2F;#!topic&#x2F;mozilla.dev.platform&#x2F;CBhSPWs3HS8\" rel=\"nofollow\">https:&#x2F;&#x2F;groups.google.com&#x2F;forum&#x2F;#!topic&#x2F;mozilla.dev.platform...</a><p>This wasn&#x27;t developed and deployed in secret. According to the comments in <a href=\"https:&#x2F;&#x2F;bugzilla.mozilla.org&#x2F;show_bug.cgi?id=366559\" rel=\"nofollow\">https:&#x2F;&#x2F;bugzilla.mozilla.org&#x2F;show_bug.cgi?id=366559</a>, the GitHub repository has been public since at least November 2014.<p>You may not like Google, but insinuating evil plans every time they do something cool isn&#x27;t helping anyone.","comments":[]},{"id":10257635,"level":1,"user":"mhandley","time":1442916069,"time_ago":"an hour ago","content":"<p>There doesn&#x27;t seem to be any technical downside to implementing it and likely significant upside.  It&#x27;s Apache-licensed which grants both copyright and patent rights that cover the code.   The spec is published as a Internet Draft, scheduled to become an Informational RFC.  What&#x27;s not to like?  I&#x27;m not one to drink the Google kool-aid, but seriously, what else would you like Google to do?","comments":[]}]}],"comments_count":37})}
  return { story: state.getIn(['stories', state.get('currentStoryId')]) }
}
export default connect(mapStateToProps)(Comments);
