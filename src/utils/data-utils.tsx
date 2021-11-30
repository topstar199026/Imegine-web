import axios from 'axios';
export function save(key,val) {  
	if(key === 'token')axios.defaults.headers.common['Authorization'] = `Bearer ${val}`;
	var saveData;
	saveData= JSON.stringify(val); 
	localStorage.setItem(key, saveData);
	return null;
}

export function get(key) {   
	try{
		let getData = localStorage.getItem(key);
		let val = JSON.parse(getData);
		if(key === 'token')axios.defaults.headers.common['Authorization'] = `Bearer ${val}`;
		return val;
	}catch(e){
		return null;
	}
}

export function format() {   
    try{
		localStorage.removeItem('key');
		localStorage.removeItem('token');
    }catch(e){
  }
}
