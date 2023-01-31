import supabase from "./supabaseClient";

const createLocation = async (
  name,
  description,
  images = null,
  hoursFrom = null,
  hoursTo = null,
  pickup,
  website = null,
  email = null,
  number = null,
  tags,
  grassFed,
  organic,
  vaccineFree,
  pastureRaised,
  soyFree,
  dewormerFree,
  unfrozen,
  pricing,
  quality,
  friendly,
  howToOrder

) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .insert({
        name,
        description,
        images,
        hoursFrom,
        hoursTo,
        pickup,
        website,
        email,
        number,
        tags,
        products,
        grassFed,
  organic,
  vaccineFree,
  pastureRaised,
  soyFree,
  dewormerFree,
  unfrozen,
  pricing,
  quality,
  friendly,
        howToOrder
      })
      .select("id")
      .single();
    if (error) throw error;

    return data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default createLocation;

export const createAddress = async (
  location_id,
  full_address,
  text_address,
  lat,
  lng,
  country,
  state
) => {
  try {
    const country_id = await fetchCountryByName(country);
    const state_id = await fetchStateByName(state);

    const { data, error } = await supabase
      .from("address")
      .insert({
        full_address,
        text_address,
        lat,
        lng,
        country_id,
        state_id,
        location_id,
      })
      .select();
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchCountryByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("country")
      .select()
      .eq("name", name);
    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("country")
        .insert({ name })
        .select();
      return data[0].id;
    }

    if (error) throw error;

    return data[0].id;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchStateByName = async (name) => {
  try {
    const { data, error } = await supabase
      .from("state")
      .select()
      .eq("name", name);

    if (data.length === 0) {
      const { data, error2 } = await supabase
        .from("state")
        .insert({ name })
        .select();

      return data[0].id;
    }

    if (error) throw error;
    return data[0].id;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocations = async () => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*,address(*)");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchTags = async () => {
  try {
    const { data, error } = await supabase.from("tags").select("name");
    return data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createTag = async (name) => {
  try {
    const { data, error } = await supabase.from("tags").insert({ name });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
