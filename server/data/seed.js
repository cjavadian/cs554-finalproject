//This script aims to create courses
const connection = require("../config/mongoConnection");
const course = require("./course");


async function main(){
    try{
        await course.addCourse("Engineering Design VI", true, "Jeff Pablo","This course addresses the general topic of selection, evaluation and design of a project concept, emphasizing the principles " +
                                                                            "of team-based projects and the stages of project development. Techniques to acquire information related to the state-of-theart " +
                                                                            "concepts and components impacting the project, evaluation of alternative approaches and selection of viable solutions " +
                                                                            "based on appropriate cost factors, presentation of proposed projects at initial, intermediate and final stages of development " +
                                                                            "and related design topics.");
        await course.addCourse("Current Topics in Electrical and Computer Engineering", false, "Emma Michael", "This course consists of lectures designed to explore a topic of contemporary interest from the perspective of current research " +
                                                                                                                "and development. In addition to lectures by the instructors and discussions led by students, the course includes talks by " +
                                                                                                                "professionals working in the topic being studied.");
        await course.addCourse("Advanced Communication Systems", true, "Mike Joe", "CarInformation theory and coding. Error control coding: CRCs, trellis codes, convolutional codes, and Viterbi decoding. " +
                                                                                    "Quantization and digitization of speech: PCM, ADPCM, DM, LPC, and VSELP algorithms. Carrier recovery and synchronization. " +
                                                                                    "Multiplexers: TDM and FDM hierarchies. Echo cancelers, equalizers, and scrambler/unscramblers. Spread spectrum " +
                                                                                    "communication systems.dio");
        await course.addCourse("Engineering Programming: Java", true, "Amily Sam", "This course is a hands-on intensive introduction to solving engineering problem using Java. The focus is on building " +
                                                                                    "real applications including an electrical CAD package, molecular modelers, and controlling network communications. In " +
                                                                                    "the process, Java and object-oriented programming are mastered in order to implement efficient solutions to the target" +
                                                                                    "applications.");
        await course.addCourse("Solid State Devices", false, "Jess Mike", "Operating principle, modeling and fabrication of solid state devices for modern optical and electronic system implementation; " +
                                                                            "recent developments in solid state devices and integrated circuits; devices covered include bipolar and MOS diodes and " +
                                                                            "transistors, MESFET, MOSFET transistors, tunnel, IMPATT and BARITT diodes, transferred electron devices, light emitting " +
                                                                            "diodes, semiconductor injection and quantum-well lasers, PIN and avalanche photodetectors.");
    } catch (e) {
        throw e;
    }
    const db = await connection();
    await db.serverConfig.close();
    console.log("Done seeding database");
}

main().catch(e => {
    console.log(e);
});

