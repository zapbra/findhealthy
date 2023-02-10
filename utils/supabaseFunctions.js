import supabase from "./supabaseClient";

const createLocation = async (
  name,
  description,
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
        hoursFrom,
        hoursTo,
        pickup,
        website,
        email,
        number,
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
        howToOrder,
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

export const createUserLocation = async (
  name,
  description,
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
  howToOrder,
  user_id
) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .insert({
        name,
        description,
        hoursFrom,
        hoursTo,
        pickup,
        website,
        email,
        number,
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
        howToOrder,
        user_id,
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

export const updateLocation = async (
  name,
  description,
  hoursFrom = null,
  hoursTo = null,
  pickup,
  website = null,
  email = null,
  number = null,
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
  howToOrder,
  id
) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .update({
        name,
        description,
        hoursFrom,
        hoursTo,
        pickup,
        website,
        email,
        number,
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
        howToOrder,
      })
      .eq('id', id)
      .select(id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

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

export const updateAddress = async (
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
      .update({
        full_address,
        text_address,
        lat,
        lng,
        country_id,
        state_id,
        location_id,
      })
      .eq("location_id", location_id)
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
      .select("*,address(*), products(*)");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchTags = async () => {
  try {
    const { data, error } = await supabase.from("tags").select("name, id");
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

export const createProduct = async (
  location_id,
  name,
  price,
  dollarType,
  measurement
) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert({ location_id, name, price, dollarType, measurement });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const fetchLocation = async (id) => {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*,address(*), products(*)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createImage = async (url, deleteHash, location_id) => {
  try {
    const { data, error } = await supabase
      .from("images")
      .insert({ url, deleteHash, location_id });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteImage = async (id) => {
  try {
    const { data, error } = await supabase.from('images')
    .delete()
    .eq('id', id)
    ;
    if(error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const createImageFetch = async (url, deleteHash, location_id) => {
  try {
    const { data, error } = await supabase
      .from("images")
      .insert({ url, deleteHash, location_id })
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkUsernameUnique = async (username) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username);
    if (error) throw error;
    // if username doesn't exist, return true
    if (!data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const checkEmailUnique = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (error) throw error;
    // if email doesn't exist, return true
    if (!data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
