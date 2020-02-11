import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../store/actions/profileActions';
import Spinner from '../Spinner/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ getAllProfiles, profile: { profiles, loading }}) => {
    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);
    
    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    { !loading && profiles.length > 0 ? (
                        profiles.map(prof => (
                            <ProfileItem key={prof._id} profile={prof} />
                        ))
                    ) : <Spinner />}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profileReducer
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
