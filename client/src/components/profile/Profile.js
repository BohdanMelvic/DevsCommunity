import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../store/actions/profileActions';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGihub from './ProfileGihub';

const Profile = ({
    getProfileById, 
    match,
    profile: {profile, loading},
    auth
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            { (profile === null || loading) ? <Spinner /> : <Fragment>
                <Link to='/profiles' className='btn btn-light'>
                    Back To Profiles
                </Link>
                { auth.isAuthenticated && auth.loading === false && auth.user._id ===
                    profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}

                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            { (profile.experience.length > 0) ? (<Fragment>
                                {profile.experience.map(exp => (
                                    <ProfileExperience key={exp._id} experience={exp} />
                                ))}
                                </Fragment>) : <h4>No experience credentials</h4> }
                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            { (profile.education.length > 0) ? (<Fragment>
                                {profile.education.map(ed => (
                                    <ProfileEducation key={ed._id} education={ed} />
                                ))}
                                </Fragment>) : <h4>No education credentials</h4> }
                        </div>
                        
                        { profile.githubusername && (
                            <ProfileGihub username={profile.githubusername} />
                        ) }
                    </div>
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