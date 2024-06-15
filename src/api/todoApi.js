import axios from "axios";

export const getTodoItem = async (id) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch todo item ${id}: ${error.message}`);
  }
};
