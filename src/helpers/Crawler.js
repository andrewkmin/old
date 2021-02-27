import _axios from "../api/_axios";

class Crawler {
  #crawl = async (url) => {
    const { data } = await _axios.get(`/api/crawl/meta/?url=${url}`);
    return { data };
  };

  async getMeta(url) {
    try {
      const { data } = await this.#crawl(url);
      return { data };
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Crawler();
