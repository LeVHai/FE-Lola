import axios from "axios";

class Api {
  //auth
  /*Description Login a user
    Path: sign-in
    Method: post
    Body: {email, password}
    */
  async login(payload) {
    const response = await axios.post(
      "http://localhost:4000/users/login",
      payload
    );
    console.log(response);
    return response.data.result;
  }
  /*Description Register a user
    Path: sign-up
    Method: post
    Body: {name, email, password, date_of_birth}
    */
  async register(payload) {
    const res = await axios.post(
      "http://localhost:4000/users/register",
      payload
    );
    return res.data;
  }
  async refreshToken(refresh_token) {
    try {
      const res = await axios.post(
        "http://localhost:4000/users/refresh-token",
        { refresh_token }
      );
      return res.data;
    } catch (error) {
      console.error("Error in refreshToken API call:", error);
      throw error;
    }
  }
  async logout(refresh_token) {
    const response = await axios.post(
      "http://localhost:4000/users/logout",
      { refresh_token },
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data;
  }
  //User
  async updateUser(payload, token) {
    const response = await axios.patch(
      "http://localhost:4000/users/me",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.result;
  }
  async getCurrentUser(token) {
    const response = await axios.get("http://localhost:4000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result;
  }
  async getUser(id) {
    //axiosJWT
    console.log(id);

    const response = await axios.get(
      `http://localhost:4000/users/profile/${id}`
    );
    console.log(response);
    return response.data.result;
  }
  async getUserNotFollow(token, page, limit) {
    console.log(token);
    const response = await axios.get(
      `http://localhost:4000/users/get-user-unfollow?limit=${limit}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }

  //Post
  async createPost(payload) {
    //axiosJ
    const { access_token, data } = payload;
    const response = await axios.post("http://localhost:4000/tweets", data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data.result;
  }
  async getCommunityPost(payload) {
    const { page, limit, access_token } = payload;
    console.log(access_token);
    const response = await axios.get(
      `http://localhost:4000/tweets/tweets-with-user?limit=${
        limit || 5
      }&page=${page}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return response.data.result;
  }
  async getPost(payload) {
    const { page, limit, id, access_token } = payload;
    console.log(access_token);
    const response = await axios.get(
      `http://localhost:4000/tweets/detail/${id}?limit=${limit}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    console.log(response.data.result, "apdas");
    return response.data.result;
  }

  //media
  async uploadImg(uploadForm) {
    const response = await axios.post(
      "http://localhost:4000/medias/upload-image",
      uploadForm
    );
    return response.data;
  }
  async like(post_id, access_token) {
    console.log(post_id, access_token);

    const response = await axios.post(
      "http://localhost:4000/likes",
      { tweet_id: post_id },
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    console.log(response);
  }
  async unLike(post_id, access_token) {
    const response = await axios.delete(
      `http://localhost:4000/likes/${post_id}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    console.log(response);
  }
  async searchPost(content) {
    const response = await axios.get("http://localhost:4000/search", {
      params: {
        content: content,
        limit: 5,
        page: 1,
      },
    });
  }
  //Chat
  async createChat(payload) {
    const response = await axios.post(
      "http://localhost:4000/messenger/create",
      payload
    );
    return response
    }
  async getChat(payload) {
    const response = await axios.get("http://localhost:4000/messenger/all", {
      params: {
        limit: payload.limit,
        page: payload.page,
        userId: payload.userId,
      },
    });
    return response.data
  }
  async getOneChat({ userId, currentUserId }) {
    console.log({ userId, currentUserId });
    
    const response = await axios.get("http://localhost:4000/messenger/conversationWithUser", {
      params: { userId, currentUserId }
  });
  return response.data;
  }
  async getMessages(payload) {
    const response = await axios.get("http://localhost:4000/messenger/messages", {
      params: {
        conversationId: payload.conversationId,
      },
    });
    return response.data
  }
  async postMessages(payload) {

    const response = await axios.post("http://localhost:4000/messenger/message",payload);
    return response.data
  }
}

const apiService = new Api();
export default apiService;
