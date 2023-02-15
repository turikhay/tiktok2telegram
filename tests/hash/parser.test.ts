import { DefaultHashTagParser, HashTag } from "../../src/hash/parser";

test("default hash parser", () => {
  const p = DefaultHashTagParser.parse.bind(DefaultHashTagParser);
  expect(p("#foo #bar")).toEqual(["#foo", "#bar"]);
  expect(
    p(
      "Tricks like these save sooo much time. What other edit hacks should I test out? Add them to the comments. Shout out to @Justin Serran | Video Editor for this game changer of an edit trick. #premierepro2023 #adobepremiere #premiereprotutorial #adobetips #learnpremierepro #howtoeditvideo #videoeditingtips #contentcreator #coursecreator"
    )
  ).toEqual([
    "#premierepro2023",
    "#adobepremiere",
    "#premiereprotutorial",
    "#adobetips",
    "#learnpremierepro",
    "#howtoeditvideo",
    "#videoeditingtips",
    "#contentcreator",
    "#coursecreator",
  ]);
  expect(p("#mistakes#5")).toEqual(["#mistakes", "#5"]);
  expect(p("#mistakes#5 asdfasd")).toEqual(["#mistakes", "#5"]);
  expect(p("sadfs#mistakes#5 asdfasd")).toEqual(["#mistakes", "#5"]);
  expect(p("sadfs #mistakes#5 asdfasd")).toEqual(["#mistakes", "#5"]);
  expect(p("#real#lol#2020")).toEqual(["#real", "#lol", "#2020"]);
  expect(p("#рек")).toEqual(["#рек"]);
  expect(p("#foo_bar")).toEqual(["#foo_bar"]);
});
