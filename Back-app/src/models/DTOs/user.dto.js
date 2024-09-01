class UserDto {
    constructor({ user_id, username, email, profile_picture_url, user_creation_date, spotify_user_id, spotify_access_token, spotify_refresh_token, token_expiry_date }) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.profile_picture_url = profile_picture_url;
        this.user_creation_date = user_creation_date;
        this.spotify_user_id = spotify_user_id;
        this.spotify_access_token = spotify_access_token;
        this.spotify_refresh_token = spotify_refresh_token;
        this.token_expiry_date = token_expiry_date;
    }
}

export default UserDto;
