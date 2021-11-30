import type { FC } from 'react';
import {
	Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
interface Props {
	className?: any;
	title: string;
	link?: string;
}
const StandardButton: FC<Props> = (props) => {
		
	return (
		<>{
		props.link ?
			<Button variant="contained" className={props.className} style={{textTransform: 'none'}} 
				component={Link}
				to={props.link}
				>
				{props.title}
			</Button>
			:
			<Button variant="contained" className={props.className} style={{textTransform: 'none'}} >
				{props.title}
			</Button>
		}</>
	);
}

export default StandardButton;
