import fetch from "node-fetch";
import { Command } from "commander";
import {validation} from  "./addCommand.js"
import {addItem,itemsArr} from './itemManager.js'
import { errorMonitor } from "stream";

// async function fetchCityWeatherData(cityName, units) {
//   try {
//     const queryString = new URLSearchParams({
//       q: cityName,
//       units,
//       appId: API_KEY,
//     }).toString();
//     const requestUrl = `${WEATHER_API_BASE_URL}/weather?${queryString}`;
//     const response = await fetch(requestUrl);
//     const weatherData = await response.json();

//     return weatherData;
//   } catch (err) {
//     mondayuLogger.log("Error on weather data fetch:", err);
//     throw err;
//   }
// }




function getCommanderProgram() {
  const program = new Command();

  program
    .name("todo-app")
    .description("Use the todo list app to add/get your tasks!")
    .version("1.0.0");

  program.command("help")
  .description("");

  program.command("add")
  .description("add task to list")
  .argument("<string>","Task name")
  .action(async (taskName,options)=>{
    
    const { isPokemon, arr } = validation(taskName);
      try {
        const itemToRender = await addItem(isPokemon, arr);
        if (itemToRender === null) {
          return;
        }
       
      } catch (err) {
        console.log(err)
      }
     console.log('new todo added successfully!')
    }


)


  // program
  //   .command("get-detailed-forecast")
  //   .description("Displays in depth information about today's weather forecast")
  //   .argument("<string>", "City name")
  //   .option("-s, --scale <string>", SCALE_ARG_DESCRIPTION, SCALES.CELSIUS)
  //   .action(async (cityName, options) => {
  //     const units = convertScaleToUnits(options.scale);
  //     const weatherData = await fetchCityWeatherData(cityName, units);
  //     const { description: weatherDescription } = weatherData.weather[0];
  //     const { temp_min: minTemp, temp_max: maxTemp } = weatherData.main;
  //     const { speed: windSpeed } = weatherData.wind;

  //     console.log(
  //       `Today we will have ${weatherDescription}, temperatures will range from ${minTemp} to ${maxTemp} degrees with a wind speed of ${windSpeed}`
  //     );
  //   });

  return program;
}

const program = getCommanderProgram();
program.parse();
