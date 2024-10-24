import { Timeline } from "flowbite-react";
import {
  HiOutlineCalendar,
  HiOutlineLightBulb,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const Process = () => {
  return (
    <div className="w-full py-40 shadow-lg relative z-10 overflow-x-scroll bg-[#10284e]">
      <div className="max-w-screen-2xl mx-auto">
        <h3 className="text-3xl text-center text-gray-900 mb-2 font-semibold pb-16 text-white">
          Our Process
        </h3>
        <div className="flex justify-center">
          <Timeline horizontal className="w-full md:w-10/12">
            <Timeline.Item
              className="mx-20 my-8 md:mx-8"
              style={{ flexBasis: "20%" }}
            >
              <Timeline.Point
                icon={() => (
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background: "#10284e",
                    }}
                  >
                    <HiOutlineCalendar className="text-white text-4xl" />
                  </div>
                )}
              />
              <Timeline.Content className="ml-12 ">
                <Timeline.Title className="text-white">
                  Free Initial Consultation
                </Timeline.Title>
                <Timeline.Time className="text-white">
                  Schedule a call with staffs
                </Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>

            {/* Step 2 */}
            <Timeline.Item
              className="mx-20 my-8 md:mx-8"
              style={{ flexBasis: "20%" }}
            >
              <Timeline.Point
                icon={() => (
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background: "#10284e",
                    }}
                  >
                    <HiOutlineLightBulb className="text-white text-4xl" />
                  </div>
                )}
              />
              <Timeline.Content className="ml-12">
                <Timeline.Title className="text-white">
                  Appointments
                </Timeline.Title>
                <Timeline.Time className="text-white">
                  In person or virtual appointment with lawyer * First 15 min
                  for free
                </Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>

            {/* Step 3 */}
            <Timeline.Item
              className="mx-20 my-8 md:mx-8"
              style={{ flexBasis: "20%" }}
            >
              <Timeline.Point
                icon={() => (
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background: "#10284e",
                    }}
                  >
                    <HiOutlineClipboardList className="text-white text-4xl" />
                  </div>
                )}
              />
              <Timeline.Content className="ml-12">
                <Timeline.Title className="text-white">
                  Work & Communication
                </Timeline.Title>
                <Timeline.Time className="text-white">
                  Start on the paper work and provide timeline
                </Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>

            {/* Step 4 */}
            <Timeline.Item
              className="mx-20 my-8 md:mx-8"
              style={{ flexBasis: "20%" }}
            >
              <Timeline.Point
                icon={() => (
                  <div
                    className="p-4 rounded-full"
                    style={{
                      background: "#10284e",
                    }}
                  >
                    <HiOutlineCheckCircle className="text-white text-4xl" />
                  </div>
                )}
              />
              <Timeline.Content className="ml-12">
                <Timeline.Title className="text-white">Result</Timeline.Title>
                <Timeline.Time className="text-white">
                  Delivery the best result for our customers
                </Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default Process;
