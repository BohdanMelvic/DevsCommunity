import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../store/actions/profileActions';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

const Profile = ({
    getProfileById, 
    match,
    profile: {profile, loading},
    auth
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);

    return (
        <Fragment>
            { (profile === null || loading) ? <Spinner /> : <Fragment>
                <Link to='/profiles' className='btn btn-light'>
                    Back To Profiles
                </Link>
                { auth.isAuthenticated && auth.loading === false && auth.user._id ===
                    profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
            </Fragment>}
        </Fragment>
    )
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer
});

export default connect(mapStateToProps, { getProfileById })(Profile);