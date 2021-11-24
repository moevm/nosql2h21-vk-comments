import {useLocation, useParams} from "react-router";

const withRouter = WrappedComponent => props => {
    const params = useParams()
    const location = useLocation()

    return (
        <WrappedComponent
            {...props}
            {...location}
            params={params}
        />
    )
}

export default withRouter
