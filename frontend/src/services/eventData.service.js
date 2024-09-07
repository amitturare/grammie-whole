import { axiosInstance } from "./axiosInstance.js";

// Function to get event data
export async function getEventData() {
  try {
    const response = await axiosInstance.get("/api/event");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
}

// Function to post a new event
export async function postEvent(event) {
  const createEvent = {
    cost: event.cost,
    dateTime: "",
    description: "asfsetret",
    duration: 3,
    lastDateToEnrol: undefined,
    location: "wrwrfewt",
    title: event.title,
  };
  try {
    console.log("Create event data received", event);
    const response = await axiosInstance.post("/api/event", event);
    return response.data;
  } catch (error) {
    console.error("Error posting event:", error);
    throw error;
  }
}

// Function to enroll in an event
export async function enrollEvent(eventId, enrollmentData) {
  const url = `api/event/${eventId}/enroll`;

  try {
    const response = await axiosInstance.patch(url, enrollmentData);
    return response.data.data;
  } catch (error) {
    console.error("Error enrolling in event:", error);
    throw error;
  }
}
