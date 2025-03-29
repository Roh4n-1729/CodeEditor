export const embed = async ({ kind, version }) => {
  switch (kind) {
    case "vega":
      switch (version) {
        case "2":
          return await import("./vg2vl1").then(({ embed }) => {
            return (anchor, spec, options) => {
              return new Promise((resolve, reject) => {
                embed(anchor, { ...options, spec }, (err, result) => {
                  if (err) reject(err);
                  else resolve(result);
                });
              });
            };
          });
        case "3":
          return await import("./vg3vl1").then(({ embed }) => embed);
        case "4":
          return await import("./vg4vl2").then(({ embed }) => embed);
        case "5":
          return await import("./vg5vl4").then(({ embed }) => embed);
      }
      break;
    case "vega-lite":
      switch (version) {
        case "1":
          return await import("./vg2vl1").then(({ embed }) => {
            return (anchor, spec, options) => {
              return new Promise((resolve, reject) => {
                embed(anchor, { ...options, spec }, (err, result) => {
                  if (err) reject(err);
                  else resolve(result);
                });
              });
            };
          });
        case "2":
          return await import("./vg4vl2").then(({ embed }) => embed);
        case "3":
          return await import("./vg5vl3").then(({ embed }) => embed);
        case "4":
          return await import("./vg5vl4").then(({ embed }) => embed);
        case "5":
          return await import("./vg5vl5").then(({ embed }) => embed);
      }
      break;
  }
};

export const supportedKinds = ["vega", "vega-lite"];
