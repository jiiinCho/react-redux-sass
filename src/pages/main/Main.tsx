import "./Main.scss";

const Main = () => (
  <main className="main">
    <h1>
      Hello world - {process.env.NODE_ENV} {process.env.name}
    </h1>
    <ul>
      <h3>Main list, SCSS would not be overwrite?</h3>
      <li>Be patient</li>
      <li>and optimistic</li>
    </ul>
  </main>
);

export default Main;
