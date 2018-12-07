'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const emoji = require('node-emoji');

var topicName = "";

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Hello! I'm Tux. I can help you learn mathematics. Select a topic you want to learn today.`);
        agent.add(new Suggestion(`Negative Numbers`));
        agent.add(new Suggestion(`Geometry`));
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    function chooseTopicHandler(agent) {
        topicName = agent.parameters.TopicName;
        agent.add(`Thanks for choosing ${topicName} ! Would you like to watch video ?`);
        agent.add(new Suggestion(`Yes,Sure`));
        agent.add(new Suggestion(`No, Just Explain!`));
    }

    function chooseTopicVideoHandler(agent) {
        agent.add(`Here is your video. Hope you like it!`);

        if (topicName === "Negative Numbers") {
            agent.add(new Card({
                    title: `Negative Numbers`,
                    imageUrl: 'https://www.frontporchmath.com/wp-content/uploads/2016/04/integer-line-1b2.png',
                    text: `Learn more about negative numbers.`,
                    buttonText: 'Negative Numbers',
                    buttonUrl: 'https://www.youtube.com/watch?v=C38B33ZywWs'
                })
            );
        }


        if (topicName === "Geometry") {
            agent.add(new Card({
                    title: `Geometry`,
                    imageUrl: 'https://res.cloudinary.com/dk-find-out/image/upload/q_70,c_pad,w_1200,h_630,f_auto/Geometry2_hdxtr9.jpg',
                    text: `Learn more about geometry.`,
                    buttonText: 'Geometry',
                    buttonUrl: 'https://www.youtube.com/watch?v=w8wdKOsUD-4'
                })
            );
        }

        agent.add(new Suggestion(`Liked it! ${emoji.get('thumbsup')}`));
        agent.add(new Suggestion(`Not Liked it ${emoji.get('thumbsdown')}`));
    }

    function chooseTopicTextHandler(agent) {

        if (topicName === "Negative Numbers") {
            //agent.add(`Sure no problem.`);
            agent.add(`Negative numbers are those numbers which are less than zero and are on the left hand side of the number line. \nThere are several operation that can be performed on negative numbers some example are Addition, Subtraction , Multiplication and Division.`);
            agent.add(`Want to learn more ?.`);

            //agent.add(`Example of negative numbers are -1, -2, -3, and so on. Notice that negative numbers have a minus sign before them.`);
            //agent.add(`There are several operation that can be performed on negative numbers some example are Addition, Subtraction , Multiplication and Division.`);

            agent.add(new Suggestion(`Yes`));
            agent.add(new Suggestion(`No`));
            agent.add(new Suggestion(`Addition`));
            agent.add(new Suggestion(`Subtraction`));
            agent.add(new Suggestion(`Multiplication`));
            agent.add(new Suggestion(`Division`));

        }

        if (topicName === "Geometry") {
            // agent.add(`Sure no problem.`);
            agent.add(`Geometry is a branch of mathematics concerned with questions of shape, size, relative position of figures, and the properties of space. \nSome basic geometrical figures are Squares, Circles, Triangles etc.`);
            //agent.add(`Some basic geometrical figures are Squares, Circles, Triangles etc.`);
            agent.add(`Want to learn more ?.`);
            agent.add(new Suggestion(`Yes`));
            agent.add(new Suggestion(`No`));
            agent.add(new Suggestion(`Square`));
            agent.add(new Suggestion(`Circle`));
            agent.add(new Suggestion(`Triangle`));
        }
    }

    function chooseTopicTextAdditionHandler(agent) {

        if (topicName === "Negative Numbers") {
            agent.add(`When you add two negative numbers the result will be the sum of those two numbers with a minus sign. An example of adding two negative numbers: -2 + -2 = -4. \nWhen you add a negative number with a postive number the result will be the difference of those two numbers with the sign of the larger number. An example of adding a negative and a positive number: -4 + 2 = -2.`);
            //agent.add(`When you add a negative number with a postive number the result will be the difference of those two numbers with the sign of the larger number. An example of adding a negative and a positive number: -4 + 2 = -2.`);
            agent.add(`Want to learn more ?.`);

            agent.add(new Suggestion(`Yes`));
            agent.add(new Suggestion(`No`));
            agent.add(new Suggestion(`Addition`));
            agent.add(new Suggestion(`Subtraction`));
            agent.add(new Suggestion(`Multiplication`));
            agent.add(new Suggestion(`Division`));
        }

        if (topicName === "Geometry") {
            agent.add(new Card({
                    title: `Square`,
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Regular_polygon_4_annotated.svg/440px-Regular_polygon_4_annotated.svg.png',
                    text: `Learn more about Square.`,
                })
            );
            //agent.add(`In geometry, a square is a regular quadrilateral, which means that it has four equal sides and four equal angles (90-degree angles, or (100-gradian angles or right angles)`);
            agent.add(`Want to learn more ?.`);
            agent.add(new Suggestion(`Yes`));
            agent.add(new Suggestion(`No`));
            agent.add(new Suggestion(`Square`));
            agent.add(new Suggestion(`Circle`));
            agent.add(new Suggestion(`Triangle`));
        }
    }

    function chooseTopicTextSubtractionHandler(agent) {

        if (topicName === "Negative Numbers") {
            agent.add(`When you subtract two negative numbers the result will be the difference of those two numbers with the sign of the larger number. An example of subtracting two negative numbers: -4 - -2 = -2.`);
            //agent.add(`When you subtract a negative number and a positive number the result will be the sum of those two numbers with a minus sign. An example of subtracting a negative and a positive numbers: -2 - 8 = -10.`);

            agent.add(`Want to learn more ?.`);
            agent.add(new Suggestion(`Yes`));
            agent.add(new Suggestion(`No`));
            agent.add(new Suggestion(`Addition`));
            agent.add(new Suggestion(`Subtraction`));
            agent.add(new Suggestion(`Multiplication`));
            agent.add(new Suggestion(`Division`));

        }

        if (topicName === "Geometry") {
            agent.add(new Card({
                    title: `Cicle`,
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Circle-withsegments.svg/440px-Circle-withsegments.svg.png',
                    text: `Learn more about Circle.`,
                })
            );
            //agent.add(`A circle is a simple closed shape. It is the set of all points in a plane that are at a given distance from a given point, the centre`);
            agent.add(`Want to learn more ?.`);
            agent.add(new Suggestion(`Yes`));
            agent.add(new Suggestion(`No`));
            agent.add(new Suggestion(`Square`));
            agent.add(new Suggestion(`Circle`));
            agent.add(new Suggestion(`Triangle`));

        }
    }


    let intentMap = new Map();

    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Choose Topic Intent', chooseTopicHandler);
    intentMap.set('Choose Topic Intent - Video', chooseTopicVideoHandler);
    intentMap.set('Choose Topic Intent - Text', chooseTopicTextHandler);
    intentMap.set('Choose Topic Intent - Text - Addition', chooseTopicTextAdditionHandler);
    intentMap.set('Choose Topic Intent - Text - Addition - Subtraction', chooseTopicTextSubtractionHandler);

    agent.handleRequest(intentMap);
});
