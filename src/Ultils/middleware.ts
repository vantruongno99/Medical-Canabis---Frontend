import axios, { AxiosError, AxiosResponse } from 'axios'
import authservice from "../Services/auth.service"


const AxiosHandleResponse = (error: AxiosError) => {

	const response = error.response
	const status = response?.status

	if (!status) {
		return;
	}
	if ([401].includes(status)) {
		 authservice.logout()
		//return Promise.reject(error);
	}

	if ([403].includes(status)) {
		// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
		if (status === 403) {
			window.location.href  = '/403'
		}
		//return Promise.reject(error);
	}


	// Not sure why 
	if (axios.isAxiosError(error)) {
		throw Error(error.response?.data.error)
	}
}

export { AxiosHandleResponse }