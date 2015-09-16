var React = require('react-native');

var {
  Component,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  BackAndroid,
} = React;

var Article = require('./article');

class Item extends Component {
  render() {
    var separator = <Text style={{fontSize: 15, color: 'black'}}> &bull; </Text>;
    return (
      <View style={{borderBottomWidth: 1, borderBottomColor: '#FFB65D', flexDirection: 'row', alignItems: 'stretch', height: 100}}>
        <TouchableHighlight style={{flex: 1}} onPress={() => this.props.loadStory(this.props.story)}>
          <View style={{flex: 1, padding: 10, backgroundColor: 'white', justifyContent: 'center'}}>
            <Text style={{fontSize: 15, color: 'black'}}>{this.props.story.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{this.props.story.points} points</Text>
              {separator}
              <Text>{this.props.story.user}</Text>
              {separator}
              <Text>{this.props.story.time_ago}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={'orange'}>
          <View style={{flex: 1, alignSelf: 'center', backgroundColor: '#FFCC8D', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 5}}>
            <Text style={{fontSize: 30}}>{this.props.story.comments_count}</Text>
            <Text style={{fontSize: 10}}>COMMENTS</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = class Index extends Component {
  constructor() {
    super();
      fetch(`http://node-hnapi.herokuapp.com/news`)
        .then(response => response.json())
        .then(json => this.setState({ stories: json, updating: false }));

    this.state = { updating: true, stories: [] };
    // this.state = { stories: [{"id":10221165,"title":"Cisco routers in at least 4 countries infected by highly stealthy backdoor. Cisco routers in at least 4 countries in a 4th line.","points":28,"user":"Deinos","time":1442330762,"time_ago":"23 minutes ago","comments_count":5,"type":"link","url":"http://arstechnica.com/security/2015/09/attackers-install-highly-stealthy-backdoors-in-cisco-routers/","domain":"arstechnica.com"},{"id":10219727,"title":"US Navy limits 'whale-harming' sonar in Pacific","points":121,"user":"chesterfield","time":1442310398,"time_ago":"6 hours ago","comments_count":37,"type":"link","url":"http://www.bbc.com/news/world-us-canada-34252058","domain":"bbc.com"},{"id":10219003,"title":"Tmux Resurrect – Persists tmux environment across system restarts","points":120,"user":"andars","time":1442292888,"time_ago":"11 hours ago","comments_count":29,"type":"link","url":"https://github.com/tmux-plugins/tmux-resurrect","domain":"github.com"},{"id":10220291,"title":"Electability of 2016 Presidential Candidates as Implied by Betting Markets","points":34,"user":"lil_tee","time":1442321236,"time_ago":"3 hours ago","comments_count":39,"type":"link","url":"http://toddwschneider.com/posts/electability-of-2016-presidential-candidates-as-implied-by-betting-markets/","domain":"toddwschneider.com"},{"id":10219740,"title":"Playing with Pigs","points":84,"user":"geographomics","time":1442310691,"time_ago":"6 hours ago","comments_count":28,"type":"link","url":"http://www.playingwithpigs.nl/","domain":"playingwithpigs.nl"},{"id":10219780,"title":"Hello, declarative world","points":11,"user":"dkarapetyan","time":1442311609,"time_ago":"6 hours ago","comments_count":2,"type":"link","url":"http://codon.com/hello-declarative-world","domain":"codon.com"},{"id":10220621,"title":"Jack Ma: 'Harvard rejected me 10 times' [video]","points":50,"user":"jimsojim","time":1442325464,"time_ago":"2 hours ago","comments_count":60,"type":"link","url":"https://agenda.weforum.org/2015/09/jack-ma-harvard-rejected-me-10-times/?utm_content=buffer051b7&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer","domain":"agenda.weforum.org"},{"id":10219420,"title":"What Did Billion Dollar Companies Look Like at the Series A?","points":43,"user":"madmax108","time":1442302589,"time_ago":"8 hours ago","comments_count":20,"type":"link","url":"https://medium.com/@todfrancis/what-did-billion-dollar-companies-look-like-at-the-series-a-e53ea8043a85","domain":"medium.com"},{"id":10219988,"title":"A Little Guide on Using Concurrent Futures for Web Developers","points":35,"user":"_Codemonkeyism","time":1442316435,"time_ago":"4 hours ago","comments_count":8,"type":"link","url":"http://codemonkeyism.com/a-little-guide-on-using-futures-for-web-developers/","domain":"codemonkeyism.com"},{"id":10219409,"title":"NASA Struggles Over Deep-Space Plutonium Power","points":80,"user":"known","time":1442302101,"time_ago":"8 hours ago","comments_count":27,"type":"link","url":"http://www.scientificamerican.com/article/within-nasa-a-plutonium-power-struggle/","domain":"scientificamerican.com"},{"id":10219666,"title":"Flowchart.js – Simple SVG flow chart diagrams from textual representation","points":67,"user":"dola","time":1442308930,"time_ago":"6 hours ago","comments_count":7,"type":"link","url":"http://adrai.github.io/flowchart.js/","domain":"adrai.github.io"},{"id":10218883,"title":"Porting Linux to a new processor architecture, Part 2","points":60,"user":"vezzy-fnord","time":1442289484,"time_ago":"12 hours ago","comments_count":0,"type":"link","url":"https://lwn.net/Articles/656286/","domain":"lwn.net"},{"id":10219766,"title":"Capabilities and Services","points":141,"user":"miket","time":1442311376,"time_ago":"6 hours ago","comments_count":83,"type":"link","url":"http://www.spacex.com/about/capabilities","domain":"spacex.com"},{"id":10219705,"title":"On the Security of Password Manager Database Formats (2012) [pdf]","points":54,"user":"monort","time":1442309679,"time_ago":"6 hours ago","comments_count":11,"type":"link","url":"https://www.cs.ox.ac.uk/files/6487/pwvault.pdf","domain":"cs.ox.ac.uk"},{"id":10220851,"title":"OneSignal help apps send better notifications. Join our team in Mountain View","points":null,"user":null,"time":1442327721,"time_ago":"an hour ago","comments_count":0,"type":"job","url":"http://jobs.onesignal.com/apply/gpSzt4/Senior-Full-Stack-Developer","domain":"jobs.onesignal.com"},{"id":10221023,"title":"Stop Breaking the Web","points":14,"user":"bevacqua","time":1442329284,"time_ago":"an hour ago","comments_count":2,"type":"link","url":"http://ponyfoo.com/articles/stop-breaking-the-web","domain":"ponyfoo.com"},{"id":10219512,"title":"Lisp implementation in GNU make","points":64,"user":"aerique","time":1442304698,"time_ago":"8 hours ago","comments_count":10,"type":"link","url":"https://github.com/shinh/makelisp","domain":"github.com"},{"id":10219057,"title":"Building a Tetris Clone in x86 Assembly, pt. Ⅱ: I/O","points":40,"user":"colinprince","time":1442294202,"time_ago":"11 hours ago","comments_count":8,"type":"link","url":"https://cmcenroe.me/2015/09/14/tetrasm-2.html","domain":"cmcenroe.me"},{"id":10219615,"title":"Hacking X Rebirth for fun and education","points":20,"user":"trampi","time":1442307384,"time_ago":"7 hours ago","comments_count":5,"type":"link","url":"http://fabian.trampusch.info/blog/hacking-xrebirth-for-fun-and-education/","domain":"fabian.trampusch.info"},{"id":10217470,"title":"Our First Certificate Is Now Live","points":1023,"user":"joshmoz","time":1442264867,"time_ago":"19 hours ago","comments_count":224,"type":"link","url":"https://letsencrypt.org/2015/09/14/our-first-cert.html","domain":"letsencrypt.org"},{"id":10219022,"title":"Tracking Bluetooth Skimmers in Mexico, Part II","points":64,"user":"robin_reala","time":1442293416,"time_ago":"11 hours ago","comments_count":14,"type":"link","url":"http://krebsonsecurity.com/2015/09/tracking-bluetooth-skimmers-in-mexico-part-ii/","domain":"krebsonsecurity.com"},{"id":10219203,"title":"New API for directory picking and drag-and-drop","points":25,"user":"cpeterso","time":1442297360,"time_ago":"10 hours ago","comments_count":8,"type":"link","url":"https://jwatt.org/blog/2015/09/14/directory-picking-and-drag-and-drop","domain":"jwatt.org"},{"id":10218775,"title":"Should we all be looking for marginal gains?","points":44,"user":"anishkothari","time":1442286377,"time_ago":"13 hours ago","comments_count":12,"type":"link","url":"http://www.bbc.com/news/magazine-34247629","domain":"bbc.com"},{"id":10219832,"title":"The challenges of building a hypersonic airliner","points":4,"user":"williamhpark","time":1442312938,"time_ago":"5 hours ago","comments_count":0,"type":"link","url":"http://www.bbc.com/future/story/20150914-the-challenges-of-building-a-hypersonic-airliner","domain":"bbc.com"},{"id":10218832,"title":"Π-Base – A community database of topological examples","points":38,"user":"colinprince","time":1442288094,"time_ago":"12 hours ago","comments_count":5,"type":"link","url":"http://topology.jdabbs.com/","domain":"topology.jdabbs.com"},{"id":10219778,"title":"Peinjector: MITM PE file infector","points":5,"user":"geographomics","time":1442311563,"time_ago":"6 hours ago","comments_count":0,"type":"link","url":"https://github.com/JonDoNym/peinjector","domain":"github.com"},{"id":10218343,"title":"Erlang Garbage Collection Details and Why It Matters","points":103,"user":"byaruhaf","time":1442277544,"time_ago":"15 hours ago","comments_count":16,"type":"link","url":"https://hamidreza-s.github.io/erlang%20garbage%20collection%20memory%20layout%20soft%20realtime/2015/08/24/erlang-garbage-collection-details-and-why-it-matters.html","domain":"hamidreza-s.github.io"},{"id":10218762,"title":"The 'Sharpest Picture Yet' of the Higgs Boson","points":38,"user":"snake117","time":1442286117,"time_ago":"13 hours ago","comments_count":0,"type":"link","url":"http://motherboard.vice.com/read/the-sharpest-picture-yet-of-the-higgs-boson","domain":"motherboard.vice.com"},{"id":10218716,"title":"Drone hobbyists find flaws in “close call” reports to FAA from other aircraft","points":39,"user":"Varcht","time":1442285166,"time_ago":"13 hours ago","comments_count":32,"type":"link","url":"http://www.usatoday.com/story/news/2015/09/13/drone-reports-faa-close-call-near-miss-academy-model-aeronautics-/72064388/?AID=10709313&PID=3836173&SID=iekr385peb0004o400dth","domain":"usatoday.com"},{"id":10218502,"title":"DARPA helicopter can feel for the ground below to ensure a safe landing","points":84,"user":"bane","time":1442280416,"time_ago":"14 hours ago","comments_count":12,"type":"link","url":"http://www.alphr.com/technology/1001524/darpa-is-building-the-helicopter-of-the-future","domain":"alphr.com"}]}
  }

  loadStory(story) {
    console.log("ok")
    console.log(story);
    this.props.navigator.push({
      name: 'Article',
      component: Article,
      passProps: { story },
      index: 1
    });
  }

  render() {
    console.log(this.props.navigator.getCurrentRoutes())
    return (
      <ScrollView>
        {this.state.stories.map(story => <Item story={story} key={story.id} loadStory={this.loadStory.bind(this)}></Item>)}
      </ScrollView>
    );
  }
}
