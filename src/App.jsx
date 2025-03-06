import Header from './components/header/Header';
import styles from './App.module.scss';
import './global.scss';

function App() {
    console.log("App component is rendering");
    return (
        <div className={styles.appContainer}>
            <Header />
        </div>
    );
}

export default App;
