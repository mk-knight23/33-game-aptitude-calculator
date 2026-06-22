import { Question } from '@/types/apti'

export const QUESTIONS: Question[] = [
  // ============ MATH QUESTIONS ============
  {
    id: 'm1',
    category: 'math',
    text: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ...?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 'm2',
    category: 'math',
    text: 'A train 120m long passes a telegraph post in 6 seconds. Find the speed of the train in km/hr.',
    options: ['60 km/hr', '72 km/hr', '64 km/hr', '80 km/hr'],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 'm3',
    category: 'math',
    text: 'If 15% of a number is 45, what is 25% of that number?',
    options: ['60', '65', '70', '75'],
    correctAnswer: 3,
    difficulty: 'easy'
  },
  {
    id: 'm4',
    category: 'math',
    text: 'The sum of two numbers is 45 and their difference is 15. What is the larger number?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 'm5',
    category: 'math',
    text: 'What is 3/4 + 5/6 expressed as a percentage?',
    options: ['125%', '133.33%', '141.67%', '150%'],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 'm6',
    category: 'math',
    text: 'A shopkeeper sells an item at 20% profit. If he had bought it for 10% less and sold for Rs. 18 less, he would have gained 25%. Find the cost price.',
    options: ['Rs. 80', 'Rs. 90', 'Rs. 100', 'Rs. 120'],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 'm7',
    category: 'math',
    text: 'What is the value of: 16 × 8 ÷ 4 + 12 - 6?',
    options: ['32', '34', '36', '38'],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 'm8',
    category: 'math',
    text: 'If the radius of a circle is doubled, by what factor does its area increase?',
    options: ['2x', '3x', '4x', '8x'],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 'm9',
    category: 'math',
    text: 'A mixture contains milk and water in ratio 3:2. If 10 liters of water is added, the ratio becomes 3:3. How much milk was in the original mixture?',
    options: ['15 liters', '18 liters', '30 liters', '36 liters'],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 'm10',
    category: 'math',
    text: 'What is the compound interest on Rs. 10000 at 10% per annum for 2 years, compounded annually?',
    options: ['Rs. 2000', 'Rs. 2100', 'Rs. 2200', 'Rs. 2500'],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 'm11',
    category: 'math',
    text: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both are opened together, how long will it take to fill the tank?',
    options: ['10 min', '12 min', '15 min', '18 min'],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 'm12',
    category: 'math',
    text: 'What is the next number: 1, 1, 2, 3, 5, 8, 13, ...?',
    options: ['18', '20', '21', '24'],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 'm13',
    category: 'math',
    text: 'If x + 1/x = 3, what is the value of x² + 1/x²?',
    options: ['7', '8', '9', '11'],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 'm14',
    category: 'math',
    text: 'What is the LCM of 12, 15, and 20?',
    options: ['30', '40', '60', '120'],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 'm15',
    category: 'math',
    text: 'A man can row upstream at 6 km/h and downstream at 10 km/h. What is the speed of the stream?',
    options: ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
    correctAnswer: 1,
    difficulty: 'medium'
  },

  // ============ LOGIC QUESTIONS ============
  {
    id: 'l1',
    category: 'logic',
    text: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.',
    options: ['True', 'False', 'Cannot be determined'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'l2',
    category: 'logic',
    text: 'Which word does NOT belong with the others?',
    options: ['Parsley', 'Basil', 'Dill', 'Mayonnaise'],
    correctAnswer: 3,
    difficulty: 'easy'
  },
  {
    id: 'l3',
    category: 'logic',
    text: 'If ROSE is coded as 6821, CHAIR is coded as 73456, then what is the code for SEARCH?',
    options: ['246173', '214673', '214763', '216743'],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 'l4',
    category: 'logic',
    text: 'In a row of students, Ram is 7th from left and Shyam is 12th from right. If they interchange, Ram becomes 22nd from left. How many students are there in the row?',
    options: ['31', '32', '33', '34'],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 'l5',
    category: 'logic',
    text: 'If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?',
    options: ['Uncle', 'Nephew', 'Cousin', 'Father'],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 'l6',
    category: 'logic',
    text: 'Find the odd one out: 8, 27, 64, 100, 125',
    options: ['8', '27', '100', '125'],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 'l7',
    category: 'logic',
    text: 'If "TABLE" is written as "GZYOV", how is "CHAIR" written?',
    options: ['WFXSV', 'VGYTU', 'UFXRU', 'WGYTV'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'l8',
    category: 'logic',
    text: 'In a certain code, MONKEY is written as XDJMNL. How is TIGER written in that code?',
    options: ['QDFHS', 'SDFHU', 'QEHIS', 'RDGJT'],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 'l9',
    category: 'logic',
    text: 'Which completes the analogy: Book : Pages :: Tree : ?',
    options: ['Branches', 'Leaves', 'Roots', 'Trunk'],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 'l10',
    category: 'logic',
    text: 'If "DOCTOR" is written as "VQWDXR", how is "NURSE" written?',
    options: ['MTRQD', 'LSPQD', 'MTQPD', 'MURTD'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'l11',
    category: 'logic',
    text: 'Five friends A, B, C, D, E are sitting in a row facing north. A is to the left of B but right of C. E is to the right of B but left of D. Who is in the middle?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 'l12',
    category: 'logic',
    text: 'Choose the number that completes the series: 2, 5, 10, 17, 26, ?',
    options: ['35', '36', '37', '38'],
    correctAnswer: 2,
    difficulty: 'easy'
  },
  {
    id: 'l13',
    category: 'logic',
    text: 'If "+" means "×", "×" means "-", "-" means "÷", and "÷" means "+", then 8 + 6 × 4 - 2 ÷ 3 = ?',
    options: ['24', '26', '28', '30'],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 'l14',
    category: 'logic',
    text: 'Which pair is different from the others?',
    options: ['Eye : Sight', 'Ear : Hearing', 'Nose : Smell', 'Hand : Touch'],
    correctAnswer: 3,
    difficulty: 'easy'
  },
  {
    id: 'l15',
    category: 'logic',
    text: 'If today is Monday, what day will it be 100 days from now?',
    options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    correctAnswer: 0,
    difficulty: 'medium'
  },

  // ============ VERBAL QUESTIONS ============
  {
    id: 'v1',
    category: 'verbal',
    text: 'Choose the synonym for "RESILIENT":',
    options: ['Fragile', 'Stubborn', 'Flexible', 'Weak'],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 'v2',
    category: 'verbal',
    text: 'Choose the antonym for "BENEVOLENT":',
    options: ['Kind', 'Malevolent', 'Generous', 'Caring'],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 'v3',
    category: 'verbal',
    text: 'Fill in the blank: The committee met to _____ the issue of funding.',
    options: ['discuss', 'discussing', 'discussion', 'discussed'],
    correctAnswer: 0,
    difficulty: 'easy'
  },
  {
    id: 'v4',
    category: 'verbal',
    text: 'Choose the correctly spelled word:',
    options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'],
    correctAnswer: 1,
    difficulty: 'easy'
  },
  {
    id: 'v5',
    category: 'verbal',
    text: 'Choose the word that best completes: "The teacher\'s _____ approach helped students understand complex concepts."',
    options: ['pedantic', 'didactic', 'systematic', 'erratic'],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 'v6',
    category: 'verbal',
    text: 'Identify the type of noun in bold: "The **team** is playing well."',
    options: ['Common noun', 'Collective noun', 'Proper noun', 'Abstract noun'],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 'v7',
    category: 'verbal',
    text: 'Choose the meaning of the idiom "Bite the bullet":',
    options: ['To eat quickly', 'To face a difficult situation bravely', 'To be aggressive', 'To speak harshly'],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 'v8',
    category: 'verbal',
    text: 'Select the word that is closest in meaning to "Ephemeral":',
    options: ['Eternal', 'Short-lived', 'Strong', 'Visible'],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 'v9',
    category: 'verbal',
    text: 'Choose the correct form of verb: "Neither of the students _____ completed the assignment."',
    options: ['has', 'have', 'had', 'were'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'v10',
    category: 'verbal',
    text: 'What is the passive voice of "She wrote a letter"?',
    options: ['A letter was written by her', 'A letter is written by her', 'A letter has been written by her', 'A letter will be written by her'],
    correctAnswer: 0,
    difficulty: 'medium'
  },
  {
    id: 'v11',
    category: 'verbal',
    text: 'Choose the one-word substitute for "One who loves books":',
    options: ['Bibliophile', 'Philatelist', 'Numismatist', 'Lexicographer'],
    correctAnswer: 0,
    difficulty: 'hard'
  },
  {
    id: 'v12',
    category: 'verbal',
    text: 'Select the word that means "the study of the origin and history of words":',
    options: ['Syntax', 'Etymology', 'Semantics', 'Morphology'],
    correctAnswer: 1,
    difficulty: 'hard'
  },
  {
    id: 'v13',
    category: 'verbal',
    text: 'Choose the synonym for "PRAGMATIC":',
    options: ['Idealistic', 'Practical', 'Theoretical', 'Dogmatic'],
    correctAnswer: 1,
    difficulty: 'medium'
  },
  {
    id: 'v14',
    category: 'verbal',
    text: 'Identify the figure of speech: "The wind howled in the night."',
    options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
    correctAnswer: 2,
    difficulty: 'medium'
  },
  {
    id: 'v15',
    category: 'verbal',
    text: 'Choose the correct option: "He is one of the students who _____ late today."',
    options: ['is', 'are', 'was', 'has been'],
    correctAnswer: 1,
    difficulty: 'hard'
  },

  // ============ ARITHMETIC QUESTIONS ============
  {
    id: 'a1',
    category: 'arithmetic',
    text: 'What is 47 + 38?',
    options: ['75', '83', '85', '95'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '47 + 38 = 85.'
  },
  {
    id: 'a2',
    category: 'arithmetic',
    text: 'What is 144 ÷ 12?',
    options: ['10', '11', '12', '14'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '12 × 12 = 144, so 144 ÷ 12 = 12.'
  },
  {
    id: 'a3',
    category: 'arithmetic',
    text: 'What is 25% of 240?',
    options: ['50', '60', '70', '80'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: '25% = 1/4, and 240 / 4 = 60.'
  },
  {
    id: 'a4',
    category: 'arithmetic',
    text: 'A jacket costs Rs. 1200 after a 20% discount. What was the original price?',
    options: ['Rs. 1440', 'Rs. 1500', 'Rs. 1600', 'Rs. 1800'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Rs. 1200 is 80% of the original, so original = 1200 / 0.8 = Rs. 1500.'
  },
  {
    id: 'a5',
    category: 'arithmetic',
    text: 'What is the average of 12, 18, 24, and 30?',
    options: ['20', '21', '22', '24'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: 'Sum = 84, count = 4, average = 84 / 4 = 21.'
  },
  {
    id: 'a6',
    category: 'arithmetic',
    text: 'If a book costs Rs. 60 and is sold for Rs. 75, what is the profit percentage?',
    options: ['20%', '25%', '30%', '15%'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Profit = 15 on cost 60, so 15/60 = 25%.'
  },
  {
    id: 'a7',
    category: 'arithmetic',
    text: 'What is the simple interest on Rs. 5000 at 8% per annum for 3 years?',
    options: ['Rs. 1000', 'Rs. 1200', 'Rs. 1500', 'Rs. 2000'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'SI = (5000 × 8 × 3) / 100 = Rs. 1200.'
  },
  {
    id: 'a8',
    category: 'arithmetic',
    text: 'A sum doubles in 8 years at simple interest. What is the annual rate?',
    options: ['10%', '12.5%', '15%', '20%'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'To double, SI must equal the principal: rate = 100 / 8 = 12.5%.'
  },
  {
    id: 'a9',
    category: 'arithmetic',
    text: 'What is 7/8 expressed as a decimal?',
    options: ['0.785', '0.875', '0.825', '0.78'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: '7 ÷ 8 = 0.875.'
  },
  {
    id: 'a10',
    category: 'arithmetic',
    text: 'If 5 workers build a wall in 12 days, how many days for 6 workers (same rate)?',
    options: ['8', '10', '11', '14'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'Work = 5 × 12 = 60 worker-days; 60 / 6 = 10 days.'
  },

  // ============ ALGEBRA QUESTIONS ============
  {
    id: 'al1',
    category: 'algebra',
    text: 'Solve for x: 2x + 5 = 17',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '2x = 12, so x = 6.'
  },
  {
    id: 'al2',
    category: 'algebra',
    text: 'If 3x − 7 = 2x + 4, what is x?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '3x − 2x = 4 + 7, so x = 11.'
  },
  {
    id: 'al3',
    category: 'algebra',
    text: 'Expand (x + 3)(x − 2).',
    options: ['x² + x − 6', 'x² − x − 6', 'x² + 5x − 6', 'x² + x + 6'],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: 'x² − 2x + 3x − 6 = x² + x − 6.'
  },
  {
    id: 'al4',
    category: 'algebra',
    text: 'What are the roots of x² − 5x + 6 = 0?',
    options: ['1 and 6', '2 and 3', '−2 and −3', '1 and 5'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: '(x − 2)(x − 3) = 0, so x = 2 or 3.'
  },
  {
    id: 'al5',
    category: 'algebra',
    text: 'If f(x) = 2x² − 3x + 1, what is f(2)?',
    options: ['1', '3', '5', '7'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: '2(4) − 3(2) + 1 = 8 − 6 + 1 = 3.'
  },
  {
    id: 'al6',
    category: 'algebra',
    text: 'Solve the system: x + y = 10, x − y = 4. What is x?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'Adding: 2x = 14, so x = 7.'
  },
  {
    id: 'al7',
    category: 'algebra',
    text: 'Simplify: (x³ · x⁴) / x²',
    options: ['x⁵', 'x⁶', 'x⁷', 'x⁹'],
    correctAnswer: 0,
    difficulty: 'easy',
    explanation: 'x^(3+4−2) = x⁵.'
  },
  {
    id: 'al8',
    category: 'algebra',
    text: 'If a = 3 and b = −2, evaluate a² + 2ab + b².',
    options: ['1', '4', '9', '25'],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: '(a + b)² = (3 − 2)² = 1.'
  },
  {
    id: 'al9',
    category: 'algebra',
    text: 'For what value of k does x² + kx + 9 have equal roots?',
    options: ['±3', '±6', '±9', '±12'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: 'Discriminant k² − 36 = 0, so k = ±6.'
  },
  {
    id: 'al10',
    category: 'algebra',
    text: 'Solve for x: x/3 + x/6 = 5',
    options: ['6', '8', '10', '12'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: '(2x + x)/6 = 5, so 3x = 30, x = 10.'
  },

  // ============ SERIES / SEQUENCE QUESTIONS ============
  {
    id: 's1',
    category: 'series',
    text: 'Find the next term: 3, 6, 12, 24, ...',
    options: ['36', '42', '48', '54'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Each term doubles: 24 × 2 = 48.'
  },
  {
    id: 's2',
    category: 'series',
    text: 'Find the next term: 1, 4, 9, 16, 25, ...',
    options: ['30', '32', '36', '49'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Perfect squares: 6² = 36.'
  },
  {
    id: 's3',
    category: 'series',
    text: 'Find the missing term: 2, 6, 18, __, 162',
    options: ['36', '48', '54', '72'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Multiply by 3 each time: 18 × 3 = 54.'
  },
  {
    id: 's4',
    category: 'series',
    text: 'Find the next term: 5, 11, 23, 47, ...',
    options: ['71', '83', '95', '99'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'Each term = 2 × previous + 1: 47 × 2 + 1 = 95.'
  },
  {
    id: 's5',
    category: 'series',
    text: 'Find the next term: 1, 2, 6, 24, 120, ...',
    options: ['600', '720', '840', '960'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Factorials: 120 × 6 = 720.'
  },
  {
    id: 's6',
    category: 'series',
    text: 'Find the next letter pair: AB, DE, GH, JK, ...',
    options: ['LM', 'MN', 'NO', 'KL'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: 'Skip one letter each step: after JK comes MN.'
  },
  {
    id: 's7',
    category: 'series',
    text: 'Find the next term: 7, 10, 16, 28, ...',
    options: ['44', '48', '52', '56'],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: 'Differences double: +3, +6, +12, +24 → 28 + 24 = 52.'
  },
  {
    id: 's8',
    category: 'series',
    text: 'Find the odd term: 4, 9, 16, 24, 36',
    options: ['9', '16', '24', '36'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: 'All are perfect squares except 24.'
  },
  {
    id: 's9',
    category: 'series',
    text: 'Find the next term: 100, 50, 25, 12.5, ...',
    options: ['5', '6', '6.25', '8'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Halving each time: 12.5 / 2 = 6.25.'
  },
  {
    id: 's10',
    category: 'series',
    text: 'Find the next term: 2, 3, 5, 7, 11, 13, ...',
    options: ['15', '16', '17', '19'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: 'Prime numbers: the next prime after 13 is 17.'
  },

  // ============ SPEED-MATH QUESTIONS ============
  {
    id: 'sp1',
    category: 'speed',
    text: 'Quick! 9 × 7 = ?',
    options: ['56', '63', '64', '72'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: '9 × 7 = 63.'
  },
  {
    id: 'sp2',
    category: 'speed',
    text: 'Quick! 15 × 4 = ?',
    options: ['45', '50', '60', '65'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '15 × 4 = 60.'
  },
  {
    id: 'sp3',
    category: 'speed',
    text: 'Quick! 12² = ?',
    options: ['124', '132', '144', '154'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '12 × 12 = 144.'
  },
  {
    id: 'sp4',
    category: 'speed',
    text: 'Quick! 96 + 47 = ?',
    options: ['133', '141', '143', '153'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: '96 + 47 = 143.'
  },
  {
    id: 'sp5',
    category: 'speed',
    text: 'Quick! 200 − 67 = ?',
    options: ['123', '133', '143', '147'],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: '200 − 67 = 133.'
  },
  {
    id: 'sp6',
    category: 'speed',
    text: 'Quick! 25 × 16 = ?',
    options: ['350', '400', '450', '500'],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: '25 × 16 = 25 × 4 × 4 = 400.'
  },
  {
    id: 'sp7',
    category: 'speed',
    text: 'Quick! 13 × 13 = ?',
    options: ['149', '156', '169', '179'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: '13 × 13 = 169.'
  },
  {
    id: 'sp8',
    category: 'speed',
    text: 'Quick! 1000 ÷ 8 = ?',
    options: ['115', '120', '125', '130'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: '1000 / 8 = 125.'
  },
  {
    id: 'sp9',
    category: 'speed',
    text: 'Quick! 17 + 28 + 35 = ?',
    options: ['70', '78', '80', '82'],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: '17 + 28 + 35 = 80.'
  },
  {
    id: 'sp10',
    category: 'speed',
    text: 'Quick! Half of 246 = ?',
    options: ['113', '121', '123', '128'],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: '246 / 2 = 123.'
  },
  {
    id: 'sp11',
    category: 'speed',
    text: 'Quick! 48 × 25 = ?',
    options: ['1100', '1200', '1240', '1250'],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: '48 × 25 = 48 × 100 / 4 = 1200.'
  },
  {
    id: 'sp12',
    category: 'speed',
    text: 'Quick! 7 × 8 × 5 = ?',
    options: ['260', '270', '280', '290'],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: '7 × 8 = 56, 56 × 5 = 280.'
  }
]

