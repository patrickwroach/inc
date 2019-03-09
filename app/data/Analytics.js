import ReactGA from 'react-ga';

export class Analytics {
  static initialize() {
    ReactGA.initialize('UA-132781677-1');
  }

  static pageView(name) {
    ReactGA.pageview(name);
  }
}