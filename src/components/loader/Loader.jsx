import { useLoading } from "../../context/LoadingContext/LoadingContext";
import styles from "./Loader.module.css";

const Loader = function () {
	const { loading } = useLoading();
	if (!loading) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.spinner}></div>
			<h1>Loading...</h1>
		</div>
	);
};

export default Loader;
