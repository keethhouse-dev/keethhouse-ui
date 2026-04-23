import { readFile, writeFile } from "node:fs/promises";

const file = "app/page.tsx";
let src = await readFile(file, "utf8");

// Location card — change "Near Auroville, Tamil Nadu" body
src = src.replace(
  /Near Auroville, Tamil Nadu[\s\S]*?reservation is confirmed/,
  "Edayanchavadi, near Auroville\n                    <br />\n                    5–10 min from Auroville · 20–30 min to Pondicherry"
);

// Dining card — change "Authentic South Indian Breakfast: ₹400 per couple / Farm-Fresh Organic Lunch: ₹700 per couple"
src = src.replace(
  /Authentic South Indian Breakfast[\s\S]*?Farm-Fresh Organic Lunch[^<]*/,
  "South Indian Breakfast: Included\n                    <br />\n                    Lunch: ₹700 per couple\n                  "
);

// Replace the three body sections with the new six
const NEW_BODY = `            {/* Body sections */}
            <div className="space-y-6 md:space-y-8">
              {/* Meet Our Team */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" /> Meet Our Team
                </h3>
                <div className="p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm md:text-[15px] leading-relaxed text-foreground/80">
                    At Keeth House, we are a small team comprised of our friends
                    and families from local villages near Auroville. While we
                    may not operate like a traditional hotel with 24/7 reception
                    and services, we strive to offer a tranquil and delightful
                    experience. Our availability is from 8 am to 10 pm daily,
                    and our security guard is also present throughout the night
                    for added peace of mind. If you desire daily cleaning,
                    kindly inform us upon check-in or in the morning. Your
                    privacy is paramount to us; we respect your space but
                    remain eager to assist whenever needed.
                  </p>
                </div>
              </div>

              {/* Your First Keeth House Experience */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Home className="h-5 w-5 text-primary mr-2" /> Your First
                  Keeth House Experience
                </h3>
                <div className="p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm space-y-3 text-sm md:text-[15px] leading-relaxed text-foreground/80">
                  <p>
                    Step into Keeth House, nestled within the embrace of local
                    nature. While our commitment to cleanliness is unwavering,
                    our rustic setting invites occasional guests like insects,
                    furry caterpillars (best admired from a distance), frogs,
                    snakes, and mice. Kindly bear this in mind before booking,
                    as we coexist harmoniously with these creatures.
                  </p>
                  <p>
                    There are venomous snakes in this region, thus we urge you
                    to turn on your lights when moving around in the night.
                    Snakes would never attack you, you just need to make sure
                    not to step on them. Please, don&apos;t touch furry
                    caterpillars — they can bruise your skin and bring a rash.
                    Despite our diligent efforts, encounters with spiders,
                    bugs, and mosquitoes are part of our natural surroundings.
                  </p>
                  <p>
                    If these encounters make you uncomfortable, perhaps an
                    alternative accommodation might better suit your
                    preferences. Embrace the off-the-grid experience with us
                    at Keeth House.
                  </p>
                </div>
              </div>

              {/* In-House Kitchen */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <ChefHat className="h-5 w-5 text-primary mr-2" /> In-House
                  Kitchen
                </h3>
                <div className="p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm space-y-3 text-sm md:text-[15px] leading-relaxed text-foreground/80">
                  <p>
                    We&apos;re delighted to offer South Indian Breakfast which
                    is included, and Lunch at ₹700 per couple. Kindly inform
                    us in advance. We have the{" "}
                    <span className="font-medium text-foreground">
                      Tree Top Kafe
                    </span>{" "}
                    in Phase III — an exclusive café set atop a tree, offering
                    a truly unique experience. Do take some time to visit and
                    unwind with the views, sounds, and stillness around you.
                    We provide RO water and kindly request our guests to
                    refill their bottles at the designated refill station.
                  </p>
                  <p>
                    We&apos;d be glad to suggest some cafés in Auroville and
                    Pondicherry for you to explore during your stay. Swiggy
                    and Zomato deliveries are not permitted, to help us reduce
                    plastic containers and packaging entering the premises.
                  </p>
                  <p>
                    You also have the option to use our self-help kitchenette
                    in all the houses except The Khaya Nest. We look forward
                    to enhancing your experience at Keeth House!
                  </p>
                </div>
              </div>

              {/* Transportation & Arrival / Departure Support */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Car className="h-5 w-5 text-primary mr-2" /> Transportation
                  &amp; Arrival / Departure Support
                </h3>
                <div className="p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm space-y-3 text-sm md:text-[15px] leading-relaxed text-foreground/80">
                  <p>
                    We kindly ask guests to check in between{" "}
                    <span className="font-medium text-foreground">
                      12 pm and 7 pm
                    </span>{" "}
                    to avoid any inconvenience. Kindly aim to avoid arriving
                    later than 8 pm, as it can pose challenges and may not be
                    feasible in some cases. Check-out time is by 10 am.
                  </p>
                  <p>
                    For those interested in transportation assistance, we can
                    provide contacts for our trusted drivers once your
                    reservation is confirmed. Our recommended drivers offer
                    pickup services from various city locations. For
                    late-night arrivals due to flights, we recommend our
                    verified drivers for a safe and fair-priced journey to
                    Keeth House.
                  </p>
                  <p>
                    You could also rent a scooter from us at the property for
                    your commute to cafés and beaches. Please check with the
                    property manager for the rental charges.
                  </p>
                  <p>
                    Your early check-in request is important to us, and we
                    would love to accommodate it based on availability.
                    However, note that if we have a booking scheduled prior to
                    your arrival, we can only provide you with access to the
                    house by 12 pm. We kindly request your understanding and
                    cooperation in planning your arrival accordingly.
                  </p>
                </div>
              </div>

              {/* Weather at Keeth House */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Sun className="h-5 w-5 text-primary mr-2" /> Weather at
                  Keeth House
                </h3>
                <div className="p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm space-y-3 text-sm md:text-[15px] leading-relaxed text-foreground/80">
                  <p>
                    Keeth House is designed with eco-friendliness in mind,
                    ensuring your comfort even in hot weather.
                  </p>
                  <p>
                    While days might be a bit warm, evenings are incredibly
                    pleasant. Surrounded by trees, the natural environment
                    creates a cooling effect. You&apos;ll experience a
                    noticeable temperature drop, providing a refreshing and
                    chilly night ambiance.
                  </p>
                  <p>
                    We&apos;re committed to making your stay enjoyable and
                    relaxing, regardless of the weather.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Navigation className="h-5 w-5 text-primary mr-2" /> Location
                </h3>
                <div className="p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm text-sm md:text-[15px] leading-relaxed text-foreground/80">
                  <p>
                    Keeth House is located in{" "}
                    <span className="font-medium text-foreground">
                      Edayanchavadi
                    </span>
                    , just a short 5–10 minute drive from the cafés and places
                    to explore in Auroville, while Pondicherry town is about
                    20–30 minutes away. Pondicherry Airport is a convenient
                    25-minute drive, and Chennai International Airport is
                    around 3 hours away. For getting around comfortably, we
                    recommend renting a scooter.
                  </p>
                </div>
              </div>
            </div>`;

// Find the body sections container and replace it wholesale. Anchor on the comment + opening div.
const BODY_START = "{/* Simplified content sections with fewer animations */}";
const bodyStartIdx = src.indexOf(BODY_START);
if (bodyStartIdx < 0) throw new Error("body start anchor not found");

// The body sections block ends with the closing </div> before the outer max-w-4xl's close.
// Strategy: find the "</div>" sequence that closes the space-y-6 container. We'll balance braces from bodyStartIdx.
// Simpler: find the next occurrence of "In-House Kitchen" then find the closing "</div>" two levels up.
// More robust: find the matching "</div>\n          </div>\n        </div>" for the max-w-4xl block, and replace from bodyStartIdx to that exact position.

// Find the exact closing: "\n            </div>\n          </div>\n        </div>"
const EOL = src.includes("\r\n") ? "\r\n" : "\n";
const CLOSER = `            </div>${EOL}          </div>${EOL}        </div>${EOL}${EOL}        {/* Simplified decorative elements */}`;
const closerIdx = src.indexOf(CLOSER, bodyStartIdx);
if (closerIdx < 0) throw new Error("body end anchor not found");

// Replace from start of comment line (include its leading whitespace) up to (not including) the `            </div>` line of the inner container.
// bodyStartIdx points at "{/*" — back up to the beginning of the line (preserve indent)
let lineStart = src.lastIndexOf("\n", bodyStartIdx) + 1;

const before = src.slice(0, lineStart);
// The CLOSER starts with "            </div>" which is the closing of the space-y-6 container itself.
// We want to keep that closer, so replace up to closerIdx (exclusive) and preserve CLOSER.
const after = src.slice(closerIdx);

const NEW_BODY_EOL = NEW_BODY.replace(/\n/g, EOL);
src = before + NEW_BODY_EOL + EOL + after;

await writeFile(file, src, "utf8");
console.log("✓ updated Before You Arrive sections");
