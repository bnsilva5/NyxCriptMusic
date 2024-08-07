class UserDto {
    constructor({ user_id, username, email, profile_picture_url, user_creation_date }) {
        this.user_id = user_id;
        this.username = username,
        this.email = email,
        this.profile_picture_url = profile_picture_url,
        this.user_creation_date = user_creation_date
    }
}

export default UserDto;