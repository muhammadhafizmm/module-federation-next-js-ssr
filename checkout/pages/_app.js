import App from 'next/app';

function MyApp({ Component, pageProps }) {
  console.log('in app');
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async ctx => {
  console.log('in app getInitialProps');
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
