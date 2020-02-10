import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../store/actions/profileActions';
import Spinner from '../Spinner/Spinner';
import Experience from './Experience';
import Education from './Education';
import DashboardActions from './DashboardActions';

const Dashboard = ({getCurrentProfile, auth, profile}) => {
    
    useEffect( () => {
        getCurrentProfile();
    }, []);

    return profile.loading && profile.profile === null 
        ? <Spinner />
        : <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Welcome { auth.user && auth.user.name }
            </p>
            {  profile.profile !== null 
                ? <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.profile.experience} />
                        <Education education={profile.profile.education} />
                    </Fragment> 
                : <Fragment>
                     <p>You have not yet setup a profile, please add some info</p>
                     <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                     </Link>

                  </Fragment>}
          </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.authReducer,
    profile: state.profileReducer
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
