require('dotenv').config({ path: __dirname + '/../.env' });

const mongoose = require('mongoose');
const { Phy, PhyDetail } = require('../models/Physio');

// 1. Prepare clean JavaScript data without _id or timestamps
const physioData = [
  { title: "Cognitive Decline", content: "A progressive decrease in mental abilities, including memory loss, difficulty with problem-solving, and reduced concentration, significantly impacting daily activities." },
  { title: "Motor Impairment", content: "Difficulty with voluntary physical movement, presenting as tremors, muscle stiffness (rigidity), poor balance, and a general lack of coordination." },
  { title: "Seizures", content: "Sudden, uncontrolled electrical disturbances in the brain that can alter behavior, movements, feelings, and levels of consciousness." },
  { title: "Aphasia", content: "An acquired impairment of language, affecting the ability to speak, understand, read, and write. It does not affect intelligence." },
  { title: "Sensory Disruption", content: "Broad issues with processing sensory input, manifesting as numbness, paresthesia (tingling), vision problems, or chronic neuropathic pain." },
  { title: "Ataxia", content: "A lack of voluntary coordination of muscle movements that can include gait abnormality, speech changes, and difficulties with fine motor tasks." },
  { title: "Dystonia", content: "A movement disorder where muscles contract uncontrollably, causing repetitive or twisting movements and abnormal postures." },
  { title: "Spasticity", content: "A condition where muscles stiffen or tighten due to a velocity-dependent increase in tonic stretch reflexes, preventing normal fluid movement." },
  { title: "Dysphagia", content: "Difficulty or discomfort in swallowing, which can lead to aspiration, malnutrition, and dehydration if not properly managed." },
  { title: "Amnesia", content: "A significant deficit in memory caused by brain damage, disease, or psychological trauma, affecting the ability to recall past events or form new memories." },
  { title: "Apraxia", content: "The inability to execute learned, purposeful movements, despite having the desire and the physical ability to perform them." },
  { title: "Hemianopsia", content: "A visual field loss on the left or right side of the vertical midline, often occurring after a stroke or brain injury." },
  { title: "Vertigo", content: "A distinct sensation of spinning or the environment spinning around you, typically a symptom of a vestibular system disorder." },
  { title: "Dysarthria", content: "A motor speech disorder caused by neurological injury, resulting in slurred, slow, or difficult-to-understand speech due to muscle weakness." },
  { title: "Neuropathic Fatigue", content: "An overwhelming and pathological sense of tiredness and lack of energy, not relieved by rest, common in neurological conditions." },
  { title: "Foot Drop", content: "Difficulty lifting the front part of the foot, causing it to drag on the ground while walking. It's a sign of an underlying neurological or muscular problem." },
  { title: "Incontinence (Neurogenic Bladder/Bowel)", content: "Loss of bladder or bowel control due to a disruption of the nerve signals between the brain and the bladder or bowels." },
  { title: "Hemiparesis/Hemiplegia", content: "Weakness (paresis) or paralysis (plegia) on one side of the body, a common result of a stroke affecting one hemisphere of the brain." },
  { title: "Chronic Pain", content: "Persistent pain that lasts longer than 12 weeks despite medication or treatment, often stemming from nerve damage (neuropathic pain)." },
  { title: "Agnosia", content: "The inability to process sensory information and recognize objects, persons, sounds, shapes, or smells despite intact senses." },
  { title: "Bradykinesia", content: "Slowness of movement, a cardinal manifestation of Parkinson's disease, affecting the initiation and execution of voluntary movements." },
  { title: "Diplopia", content: "Double vision; the simultaneous perception of two images of a single object that may be displaced horizontally, vertically, or diagonally." },
  { title: "Executive Dysfunction", content: "A disruption of the high-level cognitive processes that manage and control other cognitive functions, like planning, organizing, and problem-solving." },
  { title: "Myoclonus", content: "Sudden, brief, involuntary twitching or jerking of a muscle or group of muscles. It is not a disease, but a clinical sign." },
  { title: "Neglect (Unilateral)", content: "A deficit in attention to and awareness of one side of space, where a patient fails to report, respond, or orient to stimuli presented to the side opposite a brain lesion." },
  { title: "Paraplegia", content: "Paralysis that affects the lower half of the body, including both legs, typically caused by a spinal cord injury." },
  { title: "Quadriplegia/Tetraplegia", content: "Paralysis of all four limbs (both arms and both legs), usually resulting from a high-level spinal cord injury in the cervical region." },
  { title: "Rigidity", content: "Muscle stiffness and resistance to passive movement, independent of the velocity of the movement. A common symptom of Parkinson's disease." },
  { title: "Sleep Disorders", content: "Disruptions in sleeping patterns, such as insomnia, sleep apnea, or restless legs syndrome, often secondary to a primary neurological condition." },
  { title: "Tremor", content: "An involuntary, rhythmic muscle contraction leading to shaking movements in one or more parts of the body. It can be a resting or action tremor." }
];

const physioDetailData = [
  { title: "Cognitive Decline", condition: "Impairment in executive functions, memory, and processing speed.", pt_manage: "Dual-task training, functional task-oriented exercises, promoting physical activity to enhance cerebral blood flow, and patient education on safety." },
  { title: "Motor Impairment", condition: "Characterized by bradykinesia, rigidity, tremors, and postural instability.", pt_manage: "Gait training with cues, balance exercises, large-amplitude functional movements (e.g., LSVT BIG), stretching, and strengthening." },
  { title: "Seizures", condition: "Episodic abnormal neuronal activity resulting in convulsions or altered consciousness.", pt_manage: "Ensuring patient safety during a seizure. Education on triggers and benefits of moderate exercise. Post-ictal management of musculoskeletal injuries." },
  { title: "Aphasia", condition: "Language disorder affecting production or comprehension of speech and writing.", pt_manage: "Use simple, direct commands, gestures, and visual aids. Focus on functional mobility goals that the patient can understand." },
  { title: "Sensory Disruption", condition: "Alteration in sensation, including numbness, paresthesia, or proprioceptive loss.", pt_manage: "Intensive balance and proprioceptive training, sensory integration techniques, patient education on skin protection, and using vision to compensate." },
  { title: "Ataxia", condition: "Poor coordination and unsteadiness due to cerebellar damage.", pt_manage: "Coordination and balance exercises (e.g., Frenkel exercises), core strengthening, and use of weighted vests or limbs to provide additional sensory feedback." },
  { title: "Dystonia", condition: "Sustained or intermittent muscle contractions causing abnormal, repetitive movements or postures.", pt_manage: "Stretching, sensory tricks (geste antagoniste), splinting to prevent contractures, and exercises to strengthen antagonist muscles." },
  { title: "Spasticity", condition: "Velocity-dependent increase in muscle tone, common in UMN lesions.", pt_manage: "Prolonged stretching, weight-bearing exercises, cryotherapy, splinting/casting, and functional task practice to inhibit tone." },
  { title: "Dysphagia", condition: "Difficulty swallowing foods or liquids, increasing risk of aspiration pneumonia.", pt_manage: "Exercises to strengthen swallowing muscles (e.g., Masako maneuver), postural adjustments like chin tuck, and recommending modified food textures." },
  { title: "Amnesia", condition: "Loss of memories, such as facts, information and experiences.", pt_manage: "Establish consistent routines, use external memory aids (checklists, alarms), and focus on procedural learning (learning by doing) for motor tasks." },
  { title: "Apraxia", condition: "Motor planning deficit where the patient cannot perform a task on command.", pt_manage: "Breaking down tasks into small steps, using physical and verbal cues, repetitive practice of functional activities, and strategy training." },
  { title: "Hemianopsia", condition: "Decreased vision or blindness in half the visual field of one or both eyes.", pt_manage: "Scanning techniques to turn head and search into the blind field, visual restoration therapy, and environmental modifications for safety." },
  { title: "Vertigo", condition: "Sensation of the environment moving or spinning, due to vestibular problems.", pt_manage: "Vestibular rehabilitation therapy (VRT), including gaze stability exercises, habituation exercises, and canalith repositioning maneuvers (e.g., Epley)." },
  { title: "Dysarthria", condition: "Slurred or slow speech due to weakness of the speech muscles.", pt_manage: "Exercises to improve muscle strength and control of lips, tongue, and jaw. Breathing exercises to support speech and pacing techniques." },
  { title: "Neuropathic Fatigue", condition: "A profound, pathological level of fatigue disproportionate to activity level.", pt_manage: "Energy conservation techniques, graded exercise programs to improve endurance without causing exhaustion, and activity pacing (activity-rest cycles)." },
  { title: "Foot Drop", condition: "Weakness of the ankle dorsiflexor muscles, leading to an inability to clear the foot during swing phase of gait.", pt_manage: "Strengthening exercises for tibialis anterior, functional electrical stimulation (FES), and prescription of an Ankle-Foot Orthosis (AFO)." },
  { title: "Incontinence (Neurogenic Bladder/Bowel)", condition: "Loss of voluntary control over urinary or fecal discharge due to neurological damage.", pt_manage: "Pelvic floor muscle training (Kegel exercises), biofeedback, timed voiding schedules, and education on fluid and diet management." },
  { title: "Hemiparesis/Hemiplegia", condition: "Unilateral weakness (hemiparesis) or paralysis (hemiplegia) affecting the arm, leg, and trunk on one side of the body.", pt_manage: "Constraint-Induced Movement Therapy (CIMT), task-specific training, strengthening, and mobility training to improve function on the affected side." },
  { title: "Chronic Pain", condition: "Ongoing pain caused by a primary lesion or dysfunction in the nervous system.", pt_manage: "Transcutaneous Electrical Nerve Stimulation (TENS), graded motor imagery, desensitization techniques, and therapeutic exercise to improve function." },
  { title: "Agnosia", condition: "Inability to interpret sensations and hence to recognize things, despite intact sensory pathways.", pt_manage: "Repetitive sensory and object identification tasks, using alternative senses to compensate, and strategy training in a functional context." },
  { title: "Bradykinesia", condition: "Extreme slowness in initiating and executing movements.", pt_manage: "Use of external cues (auditory like a metronome, visual like lines on the floor), task simplification, and high-amplitude, repetitive exercises." },
  { title: "Diplopia", condition: "Seeing two images of a single object, caused by misalignment of the eyes.", pt_manage: "Eye muscle exercises (orthoptics), use of prisms or eye patches, and exercises to improve convergence and divergence." },
  { title: "Executive Dysfunction", condition: "Difficulty with planning, organizing, initiating, and self-monitoring tasks.", pt_manage: "Goal Management Training (GMT), teaching compensatory strategies (e.g., using planners, breaking down tasks), and problem-solving training in real-world scenarios." },
  { title: "Myoclonus", condition: "Brief, shock-like, involuntary muscle jerks.", pt_manage: "Focus on fall prevention strategies, balance training, and creating a safe environment. PT management is largely supportive." },
  { title: "Neglect (Unilateral)", condition: "Failure to attend to stimuli on the side of space opposite to a brain lesion.", pt_manage: "Visual scanning exercises, limb activation therapy (encouraging use of the neglected limb), prism adaptation, and environmental setup to force attention to the neglected side." },
  { title: "Paraplegia", condition: "Impairment or loss of motor or sensory function in the lower extremities.", pt_manage: "Strengthening of innervated upper body and trunk muscles, wheelchair mobility skills, transfer training, and management of secondary complications." },
  { title: "Quadriplegia/Tetraplegia", condition: "Paralysis affecting all four limbs due to a high spinal cord injury.", pt_manage: "Maximizing function of remaining innervated muscles (e.g., neck, shoulders), respiratory muscle training, pressure relief techniques, and training on assistive technology." },
  { title: "Rigidity", condition: "Increased resistance to passive movement throughout the entire range of motion.", pt_manage: "Passive and active range of motion exercises, rhythmic rotational movements of the trunk and limbs, and functional mobility training." },
  { title: "Sleep Disorders", condition: "Difficulty initiating or maintaining sleep, or non-restorative sleep.", pt_manage: "Education on sleep hygiene, relaxation techniques, and developing a regular, moderate exercise routine that does not interfere with sleep onset." },
  { title: "Tremor", condition: "Involuntary, rhythmic, oscillatory movement of a body part.", pt_manage: "Use of weighting, bracing, biofeedback to reduce tremor amplitude, and training compensatory strategies to improve function during activities of daily living." }
];


const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing data
        await Phy.deleteMany({});
        await PhyDetail.deleteMany({});
        console.log('🗑️  Previous data deleted');

        // Insert the main physio documents
        const createdPhysios = await Phy.insertMany(physioData);
        console.log(`🌱 ${createdPhysios.length} Physio documents created`);

        // Create a map of titles to their new _id's for easy lookup
        const physioMap = createdPhysios.reduce((map, doc) => {
            map[doc.title] = doc._id;
            return map;
        }, {});

        // Prepare the detail documents with the correct postId
        const detailsToCreate = physioDetailData.map(detail => {
            return {
                ...detail,
                postId: physioMap[detail.title] // Link using the new _id
            };
        });

        // Insert the linked detail documents
        const createdDetails = await PhyDetail.insertMany(detailsToCreate);
        console.log(`🔗 ${createdDetails.length} PhysioDetail documents created and linked`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        // Ensure the connection is closed
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
    }
};

seedDB();