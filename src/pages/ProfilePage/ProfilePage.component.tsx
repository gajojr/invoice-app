const ProfilePage = () => {
    return (
        <div>
            Welcome {`${localStorage.getItem('username')}`}
        </div>
    )
}

export default ProfilePage;
