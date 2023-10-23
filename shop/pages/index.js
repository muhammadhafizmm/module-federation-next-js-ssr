import HomePage from 'home/home';
console.log('homepage', HomePage)
const Home = HomePage;
Home.getInitialProps = HomePage.getInitialProps;
export default Home;
