import logo from './logo.svg';
import './App.css';

function Header(props) {
  return <header><h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1></header>
}
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a title={t.title} href={'/read/' + t.id} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(event.target.title);
    }}>{t.title} : {t.body}</a></li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h3>{props.title}</h3>
    {props.body}
  </article>
}
function App() {
  const topics = [
    { id: 1, title: 'Front-end', body: 'React' },
    { id: 2, title: 'Back-end', body: 'spring' },
    { id: 3, title: 'Programming Language', body: 'Java, JavaScript, HTML, CSS' },
    { id: 4, title: 'API', body: 'Gmail API' }
  ]
  return (
    <div>
      <Header title="Everyday Project" onChangeMode={()=>{
        alert('Header');
      }}></Header>
      <Article title="***프로젝트 개요***"  body="스프링과 리액트를 사용하여 [에브리타임] 이라는 대학 커뮤니티 사이트를 카피하는 프로젝트를 진행."></Article>
      <br></br><h3>Implementation Tools</h3>
      <Nav topics={topics} onChangeMode={(title)=>{
        alert(title);
      }}></Nav>
      
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
