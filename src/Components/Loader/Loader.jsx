import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import style from "./Loader.module.css";

const LoaderSpinner = () => (
	<div className={style.Loader}>
        <Loader
            type="Puff"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={100000} />
	</div>
);

export default LoaderSpinner;
