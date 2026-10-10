    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });

    const themeSelect = document.querySelector("#theme-select");
    const themeStorageKey = "rizal-site-theme";

    function readSavedValue(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.warn(`Could not read saved site preference "${key}".`, error);
        return null;
      }
    }

    function setTheme(theme, save = false) {
      const selectedTheme = theme === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = selectedTheme;
      themeSelect.value = selectedTheme;
      document.querySelector('meta[name="theme-color"]').content =
        selectedTheme === "dark" ? "#171411" : "#f3ecdf";
      if (!save) return;
      try {
        window.localStorage.setItem(themeStorageKey, selectedTheme);
      } catch (error) {
        console.warn("Could not save the selected color theme.", error);
      }
    }

    setTheme(readSavedValue(themeStorageKey));
    themeSelect.addEventListener("change", () => setTheme(themeSelect.value, true));

    document.querySelectorAll(".creator-photo img").forEach((image) => {
      const showPlaceholder = () => {
        image.hidden = true;
        if (image.nextElementSibling) image.nextElementSibling.hidden = false;
      };
      image.addEventListener("error", showPlaceholder, { once: true });
      if (image.complete && image.naturalWidth === 0) showPlaceholder();
    });

    const heroProfiles = {
      rizal: {
        name: "José Rizal",
        bio: "This archival portrait and monument represent a writer whose books and civic work helped Filipinos think about shared identity and colonial injustice.",
        role: "Filipino doctor, novelist, essayist, and reformist (1861–1896). Rizal wrote Noli Me Tángere and El Filibusterismo, founded La Liga Filipina, and taught and practiced medicine during exile in Dapitan.",
        connection: "Rizal's writing and execution influenced Filipino nationalism. He advocated peaceful reform and did not found or lead the Katipunan or its armed revolution.",
        credit: "https://commons.wikimedia.org/wiki/File:Jose_Rizal_full.jpg"
      },
      bonifacio: {
        name: "Andrés Bonifacio",
        bio: "This portrait or monument commemorates a central organizer of the Philippine Revolution and founder of the Katipunan.",
        role: "Revolutionary organizer and one of the founders and leaders of the Katipunan, which pursued independence from Spain.",
        connection: "Rizal's novels helped nurture nationalist ideas among Filipinos, including revolutionaries. Bonifacio led a separate armed movement; Rizal favored peaceful reform and did not command the Katipunan.",
        credit: "https://commons.wikimedia.org/wiki/File:Andr%C3%A9s_Bonifacio.jpg"
      },
      "del-pilar": {
        name: "Marcelo H. del Pilar",
        bio: "This portrait or monument honors one of the leading Filipino reformists of the Propaganda Movement.",
        role: "Filipino lawyer, journalist, satirist, and reformist; he edited La Solidaridad and argued for equal rights and representation.",
        connection: "Del Pilar and Rizal both used writing to advocate reform and Filipino representation. They shared goals but sometimes differed over leadership and strategy.",
        credit: "https://commons.wikimedia.org/wiki/File:Marcelo_Hilario_del_Pilar_y_Gatmait%C3%A1n_(1850-1896)_portrait.jpg"
      },
      "lopez-jaena": {
        name: "Graciano López Jaena",
        bio: "This portrait or monument remembers an Ilonggo orator and journalist whose speeches and writing called attention to colonial abuses.",
        role: "Journalist, orator, and leading Propaganda Movement reformist; he helped found La Solidaridad and served as its first editor.",
        connection: "Like Rizal, López Jaena used writing and public argument to advocate reform. Their work helped spread the movement's ideas to a wider public.",
        credit: "https://commons.wikimedia.org/wiki/File:1970-NHI-Graciano_Lopez_Jaena.png"
      },
      "rizal-del-pilar": {
        name: "José Rizal & Marcelo H. del Pilar",
        bio: "This archival photograph shows two major Filipino reformists in Madrid.",
        role: "Rizal was a doctor, novelist, essayist, and reformist; del Pilar was a lawyer, journalist, satirist, and editor of La Solidaridad.",
        connection: "Both took part in the Propaganda Movement and used writing to argue for reform. Their shared cause helped Filipino readers connect local injustices to a wider call for equality and representation.",
        credit: "https://commons.wikimedia.org/wiki/File:Jos%C3%A9_Rizal_with_Marcelo_del_Pilar_in_Madrid.jpg"
      },
      dapitan: {
        name: "Rizal Shrine, Dapitan",
        bio: "This historic site recalls the four years José Rizal spent in exile in Dapitan, Mindanao, from 1892 to 1896.",
        role: "During exile, Rizal taught students, treated patients as a physician, farmed, studied nature, and contributed to community projects.",
        connection: "Dapitan shows how Rizal put his belief in education and public service into practice while separated from the reform movement in Manila.",
        credit: "https://commons.wikimedia.org/wiki/File:Rizal_Shrine,_Dapitan_City_(Features_and_Structures)_02.JPG"
      }
    };
    const heroImageDialog = document.querySelector("#hero-image-dialog");
    const heroImageClose = document.querySelector("#hero-image-close");
    const heroImageLarge = document.querySelector("#hero-image-large");
    const heroImageCaption = document.querySelector("#hero-image-caption");
    const heroImageTitle = document.querySelector("#hero-image-title");
    const heroImageBio = document.querySelector("#hero-image-bio");
    const heroImageRole = document.querySelector("#hero-image-role");
    const heroImageConnection = document.querySelector("#hero-image-connection");
    const heroImageCredit = document.querySelector("#hero-image-credit");

    function openHeroImage(image) {
      const profile = heroProfiles[image.dataset.heroProfile];
      if (!profile) return;
      heroImageLarge.src = image.currentSrc || image.src;
      heroImageLarge.alt = image.alt;
      heroImageCaption.textContent = image.closest("figure")?.querySelector("figcaption")?.textContent.trim() || image.alt;
      heroImageTitle.textContent = profile.name;
      heroImageBio.textContent = profile.bio;
      heroImageRole.textContent = profile.role;
      heroImageConnection.textContent = profile.connection;
      heroImageCredit.href = image.closest("a")?.href || profile.credit;
      heroImageCredit.hidden = false;
      heroImageDialog.showModal();
    }

    document.querySelectorAll("img[data-hero-profile]").forEach((image) => {
      const profile = heroProfiles[image.dataset.heroProfile];
      if (!profile) return;
      const trigger = image.closest("a") || image;
      trigger.tabIndex = 0;
      trigger.setAttribute("role", "button");
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-label", `Enlarge image and view historical role and connection to Rizal: ${profile.name}`);
      if (trigger !== image) image.tabIndex = -1;
    });
    document.addEventListener("click", (event) => {
      const image = event.target.closest("img[data-hero-profile]") ||
        event.target.closest("a")?.querySelector("img[data-hero-profile]");
      if (!image) return;
      if (image.closest("a")) event.preventDefault();
      openHeroImage(image);
    });
    document.addEventListener("keydown", (event) => {
      const image = event.target.closest?.("img[data-hero-profile]") ||
        event.target.closest?.('a[aria-haspopup="dialog"]')?.querySelector("img[data-hero-profile]");
      if (!image || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      openHeroImage(image);
    });
    heroImageClose.addEventListener("click", () => heroImageDialog.close());
    heroImageDialog.addEventListener("click", (event) => {
      if (event.target === heroImageDialog) heroImageDialog.close();
    });

    const heroQuotes = [
      {
        text: "I die without seeing the dawn brighten over my native land! You, who have it to see, welcome it—and forget not those who have fallen during the night!",
        author: "José Rizal",
        source: "Mi Último Adiós · English translation"
      },
      {
        text: "Aling pag-ibig pa ang hihigit kaya / sa pagkadalisay at pagkadakila / gaya ng pag-ibig sa tinubuang lupa?",
        author: "Andrés Bonifacio",
        source: "Pag-ibig sa Tinubuang Lupa · original Tagalog"
      },
      {
        text: "Ang tunay na kabanalan ay ang pagkakawang-gawa, ang pag-ibig sa kapwa, at ang isukat ang bawat kilos, gawa’t pangungusap sa talagang Katuwiran.",
        author: "Emilio Jacinto",
        source: "Kartilya ng Katipunan · original Tagalog"
      }
    ];
    const heroQuoteToggle = document.querySelector("#hero-quote-toggle");
    const heroQuotePanel = document.querySelector("#hero-quote-panel");
    const heroQuoteClose = document.querySelector("#hero-quote-close");
    const heroQuoteNext = document.querySelector("#hero-quote-next");
    const heroQuoteText = document.querySelector("#hero-quote-text");
    const heroQuoteAuthor = document.querySelector("#hero-quote-author");
    const heroQuoteSource = document.querySelector("#hero-quote-source");
    let activeHeroQuote = -1;

    function showNextHeroQuote() {
      activeHeroQuote = (activeHeroQuote + 1) % heroQuotes.length;
      const quote = heroQuotes[activeHeroQuote];
      heroQuoteText.textContent = `“${quote.text}”`;
      heroQuoteAuthor.textContent = quote.author;
      heroQuoteSource.textContent = quote.source;
    }

    function setHeroQuoteOpen(open) {
      heroQuotePanel.hidden = !open;
      heroQuotePanel.setAttribute("aria-hidden", String(!open));
      heroQuoteToggle.setAttribute("aria-expanded", String(open));
      if (open) {
        if (activeHeroQuote < 0) showNextHeroQuote();
        heroQuoteClose.focus();
      } else {
        heroQuoteToggle.focus();
      }
    }

    heroQuoteToggle.addEventListener("click", () => {
      setHeroQuoteOpen(heroQuotePanel.hidden);
    });
    heroQuoteClose.addEventListener("click", () => setHeroQuoteOpen(false));
    heroQuoteNext.addEventListener("click", showNextHeroQuote);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !heroQuotePanel.hidden) setHeroQuoteOpen(false);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    const statueScene = document.querySelector("[data-statue-scene]");
    const statueModel = document.querySelector("[data-statue-model]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let statueFrame = 0;

    function updateStatuePerspective() {
      statueFrame = 0;
      if (!statueScene || !statueModel || reduceMotion.matches) return;
      const bounds = statueScene.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const end = -bounds.height * 0.3;
      const rawProgress = (start - bounds.top) / (start - end);
      const progress = Math.min(1, Math.max(0, rawProgress));
      const easedProgress = 1 - (1 - progress) ** 2;
      const translateY = 112 - easedProgress * 140;
      const translateZ = -50 + easedProgress * 50;
      const rotateX = 17 - easedProgress * 18;
      const rotateY = -20 + easedProgress * 25;
      const rotateZ = -3 + easedProgress * 2;
      const scale = 0.8 + easedProgress * 0.2;

      statueModel.style.transform =
        `translate3d(0, ${translateY}px, ${translateZ}px) ` +
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
    }

    function requestStatueUpdate() {
      if (!statueFrame) statueFrame = window.requestAnimationFrame(updateStatuePerspective);
    }

    if (statueScene && statueModel && !reduceMotion.matches) {
      window.addEventListener("scroll", requestStatueUpdate, { passive: true });
      window.addEventListener("resize", requestStatueUpdate, { passive: true });
      requestStatueUpdate();
    }

    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-links a").forEach((link) => {
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));

    window.addEventListener("scroll", () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      document.body.style.setProperty("--read-progress", `${progress}%`);
    }, { passive: true });

    const tiltCard = document.querySelector("[data-tilt]");
    if (tiltCard && window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const tiltArea = tiltCard.parentElement;
      tiltArea.addEventListener("pointermove", (event) => {
        const bounds = tiltCard.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        tiltCard.style.transform = `rotateY(${-8 + x * 9}deg) rotateX(${-y * 8}deg) rotateZ(${2 + x * 1.5}deg)`;
      });
      tiltArea.addEventListener("pointerleave", () => {
        tiltCard.style.transform = "";
      });
    }

    const milestones = [
      { year: "1889", title: "A reformist newspaper", copy: "<em>La Solidaridad</em> begins publication in Spain, carrying Filipino reformist arguments to readers across the empire." },
      { year: "1891", title: "A novel challenges colonial power", copy: "Rizal publishes <em>El Filibusterismo</em>, his second novel, continuing a literary critique of colonial injustice." },
      { year: "1892", title: "La Liga Filipina is founded", copy: "Rizal establishes La Liga Filipina in Manila on 3 July. He is arrested days later and sent into exile in Dapitan." },
      { year: "1892", title: "Four years in Dapitan begin", copy: "Rizal arrives in Dapitan in July. He teaches, practices medicine, farms, studies nature, and works with the community." },
      { year: "1892", title: "The Katipunan takes shape", copy: "Andrés Bonifacio and fellow organizers found the Katipunan on 7 July, pursuing independence through a separate revolutionary path." },
      { year: "1896", title: "Revolution breaks out", copy: "The Katipunan's uprising against Spanish rule begins in August. Rizal does not endorse the armed revolt." },
      { year: "1896", title: "Rizal is executed", copy: "After his arrest and military trial, Rizal is executed in Manila on 30 December. His death becomes a potent symbol of Filipino nationalism." },
      { year: "1898", title: "Independence is declared", copy: "The independence movement continues beyond Rizal's lifetime. Emilio Aguinaldo proclaims Philippine independence on 12 June 1898." }
    ];

    const timelineRange = document.querySelector("#timeline-range");
    const timelineDots = document.querySelector("#timeline-dots");
    const timelineYear = document.querySelector("#timeline-year");
    const timelineTitle = document.querySelector("#timeline-event-title");
    const timelineCopy = document.querySelector("#timeline-event-copy");

    function showMilestone(index) {
      const milestone = milestones[index];
      timelineYear.textContent = milestone.year;
      timelineTitle.textContent = milestone.title;
      timelineCopy.innerHTML = milestone.copy;
      timelineRange.value = String(index);
      timelineDots.querySelectorAll("button").forEach((button, buttonIndex) => {
        button.setAttribute("aria-pressed", String(buttonIndex === index));
      });
    }

    milestones.forEach((milestone, index) => {
      const dot = document.createElement("button");
      dot.className = "timeline-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `${milestone.year}: ${milestone.title}`);
      dot.setAttribute("aria-pressed", String(index === 0));
      dot.addEventListener("click", () => showMilestone(index));
      timelineDots.append(dot);
    });
    timelineRange.addEventListener("input", () => showMilestone(Number(timelineRange.value)));

    const questions = [
      {
        question: "What was the Propaganda Movement mainly seeking?",
        answers: ["Immediate armed independence led by Rizal", "Political and social reforms under Spanish rule", "A return to pre-colonial rule", "The abolition of all public education"],
        correct: 1,
        explanation: "Its reformists argued for representation, equality, and civil liberties through peaceful advocacy."
      },
      {
        question: "Why did Rizal establish La Liga Filipina?",
        answers: ["To organize mutual aid and peaceful social reform", "To command the Katipunan", "To recruit soldiers for an uprising", "To replace La Solidaridad as a newspaper"],
        correct: 0,
        explanation: "La Liga was a civic association built around unity, mutual assistance, and reform."
      },
      {
        question: "Which is an example of Rizal's community work in Dapitan?",
        answers: ["Leading an armed campaign", "Serving as a colonial governor", "Teaching students and treating patients", "Editing La Solidaridad from Manila"],
        correct: 2,
        explanation: "In Dapitan, Rizal taught, practiced medicine, farmed, and helped with local public works."
      },
      {
        question: "What best describes Rizal's position on the 1896 armed revolution?",
        answers: ["He founded and commanded it", "He opposed launching an unprepared armed revolt", "He led the Katipunan from Dapitan", "He wrote its military orders"],
        correct: 1,
        explanation: "Rizal's reformist strategy differed from the Katipunan's armed path."
      },
      {
        question: "How did Rizal's execution affect the independence movement?",
        answers: ["It ended the revolution immediately", "It made him a powerful symbol of Filipino nationalism", "It changed the Katipunan into La Liga", "It meant Rizal had led the revolt"],
        correct: 1,
        explanation: "His execution galvanized nationalist feeling, even though he did not lead or endorse the uprising."
      },
      {
        question: "In which year was La Liga Filipina founded?",
        answers: ["1889", "1891", "1892", "1896"],
        correct: 2,
        explanation: "Rizal founded La Liga Filipina in Manila on 3 July 1892."
      },
      {
        question: "Who led the Katipunan?",
        answers: ["Marcelo H. del Pilar", "Andrés Bonifacio", "Graciano López Jaena", "Emilio Jacinto"],
        correct: 1,
        explanation: "Andrés Bonifacio helped establish and lead the Katipunan."
      },
      {
        question: "Where was Rizal exiled from 1892 to 1896?",
        answers: ["Madrid", "Cebu", "Dapitan", "Hong Kong"],
        correct: 2,
        explanation: "Rizal spent his exile in Dapitan, where he taught, practiced medicine, and served the community."
      },
      {
        type: "truefalse",
        question: "La Solidaridad was a reformist newspaper founded in 1889.",
        answers: ["True", "False"],
        correct: 0,
        explanation: "La Solidaridad began publication in 1889 and shared reformist arguments."
      },
      {
        type: "truefalse",
        question: "José Rizal founded and led the Katipunan's armed revolution.",
        answers: ["True", "False"],
        correct: 1,
        explanation: "Andrés Bonifacio led the Katipunan; Rizal's reformist path was separate."
      }
    ];

    const quizQuestion = document.querySelector("#quiz-question");
    const quizAnswers = document.querySelector("#quiz-answers");
    const quizCount = document.querySelector("#quiz-count");
    const quizScore = document.querySelector("#quiz-score");
    const quizFeedback = document.querySelector("#quiz-feedback");
    const quizNext = document.querySelector("#quiz-next");
    const quizTrackFill = document.querySelector("#quiz-track-fill");
    let quizIndex = 0;
    let quizPoints = 0;
    let answered = false;
    let showingResult = false;

    function renderQuestion() {
      const item = questions[quizIndex];
      answered = false;
      quizCount.textContent = `Question ${quizIndex + 1} of ${questions.length}`;
      quizScore.textContent = `Score: ${quizPoints}`;
      quizTrackFill.style.width = `${(quizIndex / questions.length) * 100}%`;
      quizQuestion.textContent = item.question;
      quizFeedback.textContent = "";
      quizNext.hidden = true;
      quizNext.innerHTML = quizIndex === questions.length - 1 ? "See your result <span aria-hidden=\"true\">→</span>" : "Next question <span aria-hidden=\"true\">→</span>";
      quizAnswers.replaceChildren();

      item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-answer";
        const letter = document.createElement("span");
        letter.className = "answer-letter";
        letter.setAttribute("aria-hidden", "true");
        letter.textContent = item.type === "truefalse" ? answer.charAt(0) : String.fromCharCode(65 + index);
        const text = document.createElement("span");
        text.textContent = answer;
        button.append(letter, text);
        button.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const isCorrect = index === item.correct;
          if (isCorrect) quizPoints += 1;
          quizScore.textContent = `Score: ${quizPoints}`;
          quizAnswers.querySelectorAll("button").forEach((choice, choiceIndex) => {
            choice.disabled = true;
            if (choiceIndex === item.correct) choice.classList.add("correct");
            else if (choiceIndex === index) choice.classList.add("incorrect");
          });
          quizFeedback.textContent = `${isCorrect ? "Correct." : "Not quite."} ${item.explanation}`;
          quizNext.hidden = false;
          quizTrackFill.style.width = `${((quizIndex + 1) / questions.length) * 100}%`;
          quizNext.focus();
        });
        quizAnswers.append(button);
      });
    }

    quizNext.addEventListener("click", () => {
      if (showingResult) {
        showingResult = false;
        quizIndex = 0;
        quizPoints = 0;
        renderQuestion();
        quizAnswers.querySelector("button")?.focus();
        return;
      }

      if (quizIndex < questions.length - 1) {
        quizIndex += 1;
        renderQuestion();
        quizAnswers.querySelector("button")?.focus();
        return;
      }
      const percentage = Math.round((quizPoints / questions.length) * 100);
      const message = quizPoints === questions.length
        ? "Excellent work—you kept the reform movement and the revolution distinct."
        : quizPoints >= 7
          ? "A strong start. Revisit the chapters to sharpen the historical connections."
          : "There is more to discover. Explore the chapters above and give it another try.";
      showingResult = true;
      quizCount.textContent = "Quiz complete";
      quizScore.textContent = `Score: ${quizPoints}/${questions.length}`;
      quizTrackFill.style.width = "100%";
      quizQuestion.textContent = `${quizPoints} of ${questions.length} correct`;
      quizAnswers.replaceChildren();
      quizFeedback.textContent = `${percentage}%. ${message}`;
      quizNext.textContent = "Try again";
      quizNext.hidden = false;
      quizNext.focus();
    });

    renderQuestion();

    const audioPlayer = document.querySelector("#audio-player");
    const audioNote = document.querySelector("#audio-note");
    const recordPlayer = document.querySelector(".record-player");
    const recordPlatter = document.querySelector("#record-platter");
    const togglePlayback = document.querySelector("#toggle-playback");
    const previousTrack = document.querySelector("#previous-track");
    const nextTrack = document.querySelector("#next-track");
    const audioSeek = document.querySelector("#audio-seek");
    const audioVolume = document.querySelector("#audio-volume");
    const currentTimeLabel = document.querySelector("#audio-current-time");
    const durationLabel = document.querySelector("#audio-duration");
    const trackTitle = document.querySelector("#track-title");
    const trackArtist = document.querySelector("#track-artist");
    const playerStatus = document.querySelector("#player-status");
    const playlist = document.querySelector("#playlist");
    const playlistCount = document.querySelector("#playlist-count");
    const recordTracks = [];
    let selectedTrack = -1;

    audioPlayer.volume = Number(audioVolume.value);

    function formatAudioTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
      return `${minutes}:${remainingSeconds}`;
    }

    function showAudioMessage(message, isError = false) {
      audioNote.textContent = message;
      audioNote.classList.toggle("is-error", isError);
    }

    function renderPlaylist() {
      playlist.replaceChildren();
      playlistCount.textContent = `${recordTracks.length} ${recordTracks.length === 1 ? "TRACK" : "TRACKS"}`;

      if (recordTracks.length === 0) {
        const empty = document.createElement("li");
        empty.className = "playlist-empty";
        empty.textContent = "The site admin is adding songs to the project playlist.";
        playlist.append(empty);
        return;
      }

      recordTracks.forEach((track, index) => {
        const row = document.createElement("li");
        row.className = `playlist-track${index === selectedTrack ? " is-current" : ""}`;
        const number = document.createElement("span");
        number.className = "playlist-track-number";
        number.setAttribute("aria-hidden", "true");
        number.textContent = String(index + 1).padStart(2, "0");

        const select = document.createElement("button");
        select.className = "playlist-select";
        select.type = "button";
        select.setAttribute("aria-current", index === selectedTrack ? "true" : "false");
        select.setAttribute("aria-label", `Play ${track.name}`);
        const name = document.createElement("span");
        name.className = "playlist-track-name";
        name.textContent = track.name;
        select.append(name);
        select.addEventListener("click", () => selectAudioTrack(index, true));

        const duration = document.createElement("span");
        duration.className = "playlist-track-duration";
        duration.textContent = formatAudioTime(track.duration);
        row.append(number, select, duration);
        playlist.append(row);
      });
    }

    function updateAudioControls() {
      const hasSelection = selectedTrack >= 0 && Boolean(recordTracks[selectedTrack]);
      const isPlaying = hasSelection && !audioPlayer.paused;
      recordPlayer.classList.toggle("is-playing", isPlaying);
      togglePlayback.disabled = !hasSelection;
      previousTrack.disabled = recordTracks.length < 2;
      nextTrack.disabled = recordTracks.length < 2;
      recordPlatter.disabled = !hasSelection;
      togglePlayback.setAttribute("aria-label", isPlaying ? "Pause selected track" : "Play selected track");
      togglePlayback.setAttribute("aria-pressed", String(isPlaying));
      togglePlayback.title = isPlaying ? "Pause selected track" : "Play selected track";
      recordPlatter.setAttribute("aria-label", hasSelection
        ? `${isPlaying ? "Pause" : "Play"} ${recordTracks[selectedTrack].name}`
        : "Choose a song from the project playlist");
    }

    async function startAudioPlayback() {
      if (selectedTrack < 0 || !recordTracks[selectedTrack]) return;
      try {
        await audioPlayer.play();
        playerStatus.textContent = `Now playing · ${recordTracks[selectedTrack].name}`;
        updateAudioControls();
      } catch (error) {
        if (error.name === "AbortError") return;
        playerStatus.textContent = "Playback could not start";
        showAudioMessage("This file could not be played by your browser. Try another audio format.", true);
        updateAudioControls();
      }
    }

    function selectAudioTrack(index, autoplay = false) {
      const track = recordTracks[index];
      if (!track) return;
      audioPlayer.pause();
      selectedTrack = index;
      audioPlayer.src = track.url;
      audioPlayer.load();
      trackTitle.textContent = track.name;
      trackArtist.textContent = track.artist || "A recording selected for this project";
      playerStatus.textContent = "Record selected · ready to play";
      currentTimeLabel.textContent = "0:00";
      durationLabel.textContent = formatAudioTime(track.duration);
      audioSeek.value = "0";
      audioSeek.style.setProperty("--slider-progress", "0%");
      renderPlaylist();
      updateAudioControls();
      if (autoplay) startAudioPlayback();
    }

      const forumForm = document.querySelector("#forum-form");
      const forumAnonymous = document.querySelector("#forum-anonymous");
      const forumName = document.querySelector("#forum-name");
      const forumMessage = document.querySelector("#forum-message");
      const forumCharCount = document.querySelector("#forum-char-count");
      const forumStatus = document.querySelector("#forum-status");
      const forumFeedStatus = document.querySelector("#forum-feed-status");
      const forumFeed = document.querySelector("#forum-feed");
      const forumPostCount = document.querySelector("#forum-post-count");
      const forumSort = document.querySelector("#forum-sort");
      const forumRefresh = document.querySelector("#forum-refresh");
      const forumConfig = window.RIZAL_FORUM_CONFIG || {};
      const forumReady = Boolean(
        forumConfig.supabaseUrl &&
        forumConfig.supabaseAnonKey &&
        !forumConfig.supabaseUrl.startsWith("YOUR_") &&
        !forumConfig.supabaseAnonKey.startsWith("YOUR_")
      );
      let forumClient = null;
      let forumUser = null;
      let forumRequestPending = false;
      let forumPosts = [];
      let forumReplies = [];
      let forumPostLikes = [];
      let forumReplyLikes = [];

      function updateIdentityControl(form) {
        const anonymous = form.querySelector('input[name="is_anonymous"]');
        const name = form.querySelector('input[name="author"]');
        const nameLabel = form.querySelector(".forum-name-label");
        if (!anonymous || !name) return;
        name.disabled = anonymous.checked;
        name.required = !anonymous.checked;
        if (nameLabel) nameLabel.hidden = anonymous.checked;
        if (anonymous.checked) name.value = "";
      }

      function updateMainIdentity() {
        forumName.disabled = forumAnonymous.checked;
        forumName.required = !forumAnonymous.checked;
        document.querySelector("#forum-name-label").hidden = forumAnonymous.checked;
        if (forumAnonymous.checked) forumName.value = "";
      }

      function setForumStatus(message, state = "") {
        forumStatus.textContent = message;
        forumStatus.dataset.state = state;
      }

      function setForumFeedStatus(message, state = "") {
        forumFeedStatus.textContent = message;
        forumFeedStatus.dataset.state = state;
      }

      function escapeForumError(error, fallback) {
        return error && typeof error.message === "string" ? error.message : fallback;
      }

      function createForumElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
      }

      function forumAuthorName(item) {
        if (item.is_anonymous) return "Anonymous reader";
        return item.author_name;
      }

      function forumDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Date unavailable";
        return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
      }

      function forumAction(label, action, id, pressed = false, disabled = false) {
        const button = createForumElement("button", "forum-action", label);
        button.type = "button";
        button.dataset.action = action;
        button.dataset.id = id;
        button.setAttribute("aria-pressed", String(pressed));
        button.disabled = disabled;
        return button;
      }

      function buildForumReplyForm(postId) {
        const form = createForumElement("form", "forum-reply-form");
        form.dataset.postId = postId;

        const identity = createForumElement("div", "forum-identity");
        const anonymousLabel = createForumElement("label", "forum-anonymous");
        const anonymous = document.createElement("input");
        anonymous.type = "checkbox";
        anonymous.name = "is_anonymous";
        anonymous.checked = true;
        anonymous.addEventListener("change", () => updateIdentityControl(form));
        anonymousLabel.append(anonymous, createForumElement("span", "", "Reply anonymously"));

        const nameLabel = createForumElement("label", "forum-name-label", "Display name");
        const nameInput = document.createElement("input");
        nameInput.className = "forum-reply-name";
        nameInput.type = "text";
        nameInput.name = "author";
        nameInput.maxLength = 40;
        nameInput.autocomplete = "nickname";
        nameInput.placeholder = "A name to show";
        nameInput.required = false;
        nameInput.disabled = true;
        nameLabel.htmlFor = `forum-reply-name-${postId}`;
        nameInput.id = `forum-reply-name-${postId}`;
        identity.append(anonymousLabel, nameLabel, nameInput);

        const message = document.createElement("textarea");
        message.name = "message";
        message.maxLength = 700;
        message.rows = 3;
        message.required = true;
        message.placeholder = "Write a thoughtful reply…";
        message.setAttribute("aria-label", "Write a reply");

        const bottom = createForumElement("div", "forum-form-bottom");
        const count = createForumElement("span", "forum-char-count", "0 / 700");
        const submit = createForumElement("button", "button forum-submit", "Post reply");
        submit.type = "submit";
        bottom.append(count, submit);

        const status = createForumElement("p", "forum-status", "");
        status.setAttribute("role", "status");
        form.append(identity, message, bottom, status);
        updateIdentityControl(form);
        message.addEventListener("input", () => {
          count.textContent = `${message.value.length} / 700`;
        });
        return form;
      }

      function renderForumPost(post, replyMap, postLikeMap, replyLikeMap, depth = 0) {
        const item = createForumElement("li", depth ? "forum-post forum-reply" : "forum-post");
        const head = createForumElement("div", depth ? "forum-reply-head" : "forum-post-head");
        const author = createForumElement("div", "forum-author");
        const authorName = forumAuthorName(post);
        const avatar = createForumElement("span", "forum-avatar", authorName.trim().charAt(0).toUpperCase() || "A");
        avatar.setAttribute("aria-hidden", "true");
        const name = createForumElement("span", "forum-author-name", authorName);
        author.append(avatar, name);
        head.append(author, createForumElement("time", "forum-post-time", forumDate(post.created_at)));
        item.append(head, createForumElement("p", "forum-post-body", post.body));

        if (depth > 0) {
          const likes = replyLikeMap.get(post.id) || [];
          const hasLiked = likes.some((like) => like.user_id === forumUser?.id);
          const actions = createForumElement("div", "forum-post-actions forum-reply-actions");
          actions.append(forumAction(`♥ ${likes.length}`, "like-reply", post.id, hasLiked));
          item.append(actions);
          return item;
        }

        const actions = createForumElement("div", "forum-post-actions");
        const likes = postLikeMap.get(post.id) || [];
        const hasLiked = likes.some((like) => like.user_id === forumUser?.id);
        actions.append(forumAction(`♥ ${likes.length}`, "like-post", post.id, hasLiked));
        actions.append(forumAction(`↳ Reply · ${(replyMap.get(post.id) || []).length}`, "reply", post.id));
        if (post.author_id === forumUser?.id) {
          actions.append(forumAction("Delete", "delete-post", post.id, false, false));
        }
        item.append(actions);

        const replyForm = buildForumReplyForm(post.id);
        replyForm.hidden = true;
        item.append(replyForm);

        const replies = replyMap.get(post.id) || [];
        if (replies.length) {
          const replyList = createForumElement("ol", "forum-replies");
          replies.forEach((reply) => replyList.append(
            renderForumPost(reply, replyMap, postLikeMap, replyLikeMap, 1)
          ));
          item.append(replyList);
        }
        return item;
      }

      function renderForum() {
        const postLikeMap = new Map();
        forumPostLikes.forEach((like) => {
          const rows = postLikeMap.get(like.post_id) || [];
          rows.push(like);
          postLikeMap.set(like.post_id, rows);
        });

        const replyMap = new Map();
        forumReplies.forEach((reply) => {
          const rows = replyMap.get(reply.post_id) || [];
          rows.push(reply);
          replyMap.set(reply.post_id, rows);
        });
        const replyLikeMap = new Map();
        forumReplyLikes.forEach((like) => {
          const rows = replyLikeMap.get(like.reply_id) || [];
          rows.push(like);
          replyLikeMap.set(like.reply_id, rows);
        });

        const posts = [...forumPosts];
        if (forumSort.value === "liked") {
          posts.sort((a, b) => (postLikeMap.get(b.id) || []).length - (postLikeMap.get(a.id) || []).length ||
            new Date(b.created_at) - new Date(a.created_at));
        }
        forumPostCount.textContent = `${posts.length}${posts.length === 100 ? "+" : ""} ${posts.length === 1 ? "note" : "notes"}`;
        forumFeed.replaceChildren();

        if (posts.length === 0) {
          forumFeed.append(createForumElement("li", "forum-empty", "The first note is waiting to be written."));
          return;
        }

        posts.forEach((post) => forumFeed.append(
          renderForumPost(post, replyMap, postLikeMap, replyLikeMap)
        ));
      }

      async function refreshForum(silent = false) {
        if (!forumClient || !forumUser || forumRequestPending) return;
        forumRequestPending = true;
        forumRefresh.disabled = true;
        if (!silent) setForumFeedStatus("Loading community notes…");
        try {
          const { data: posts, error: postError } = await forumClient
            .from("forum_posts")
            .select("id, author_id, author_name, is_anonymous, body, created_at")
            .order("created_at", { ascending: false })
            .limit(100);
          if (postError) throw postError;

          const postIds = (posts || []).map((post) => post.id);
          let replies = [];
          let postLikes = [];
          let replyLikes = [];
          if (postIds.length) {
            const [replyResult, postLikeResult] = await Promise.all([
              forumClient.from("forum_replies")
                .select("id, post_id, author_id, author_name, is_anonymous, body, created_at")
                .in("post_id", postIds)
                .order("created_at", { ascending: true })
                .limit(1000),
              forumClient.from("forum_post_likes")
                .select("post_id, user_id")
                .in("post_id", postIds)
                .limit(5000)
            ]);
            if (replyResult.error) throw replyResult.error;
            if (postLikeResult.error) throw postLikeResult.error;
            replies = replyResult.data || [];
            postLikes = postLikeResult.data || [];
            const replyIds = replies.map((reply) => reply.id);
            if (replyIds.length) {
              const replyLikeResult = await forumClient.from("forum_reply_likes")
                .select("reply_id, user_id")
                .in("reply_id", replyIds)
                .limit(5000);
              if (replyLikeResult.error) throw replyLikeResult.error;
              replyLikes = replyLikeResult.data || [];
            }
          }

          forumPosts = posts || [];
          forumReplies = replies;
          forumPostLikes = postLikes;
          forumReplyLikes = replyLikes;
          renderForum();
          setForumFeedStatus(posts?.length
            ? "Shared with readers across the project."
            : "You’re here first—start the conversation.");
          if (!silent && forumStatus.dataset.state !== "error") {
            setForumStatus("Your anonymous session is ready. Posts are shared with everyone who opens this site.", "success");
          }
        } catch (error) {
          const message = escapeForumError(error, "Could not load the shared forum.");
          setForumFeedStatus(`Could not load posts: ${message}`, "error");
        } finally {
          forumRequestPending = false;
          forumRefresh.disabled = false;
        }
      }

      async function initializeForum() {
        if (!forumReady) {
          setForumStatus("Forum setup needed: add the Supabase URL and public key in forum-config.js, then run forum-schema.sql in your Supabase project.", "error");
          setForumFeedStatus("The shared board is waiting for its Supabase connection.");
          return;
        }
        if (!window.supabase?.createClient) {
          setForumStatus("Could not load the Supabase client. Check your connection and reload the page.", "error");
          setForumFeedStatus("The forum service is currently unavailable.", "error");
          return;
        }

        try {
          forumClient = window.supabase.createClient(forumConfig.supabaseUrl, forumConfig.supabaseAnonKey);
          const { data: sessionData, error: sessionError } = await forumClient.auth.getSession();
          if (sessionError) throw sessionError;
          let session = sessionData.session;
          if (!session) {
            const { data, error } = await forumClient.auth.signInAnonymously();
            if (error) throw error;
            session = data.session;
          }
          if (!session?.user) throw new Error("Supabase did not return an anonymous reader session.");
          forumUser = session.user;
          setForumStatus("Anonymous mode is on. Uncheck it if you’d like to add a display name.", "success");
          await refreshForum();
        } catch (error) {
          setForumStatus(`Could not connect to the shared forum: ${escapeForumError(error, "Check Supabase setup.")}`, "error");
          setForumFeedStatus("Check the project URL, public key, anonymous sign-in setting, and forum-schema.sql.", "error");
        }
      }

      async function submitForumForm(form, postId = null) {
        if (!forumClient || !forumUser) {
          setForumStatus("The shared forum is not connected yet. Follow the setup steps in README.md.", "error");
          return;
        }
        const formStatus = form.querySelector(".forum-status");
        const body = form.querySelector('textarea[name="message"]').value.trim();
        const anonymous = form.querySelector('input[name="is_anonymous"]')?.checked ?? true;
        const displayName = anonymous ? "Anonymous" : form.querySelector('input[name="author"]')?.value.trim();
        if (!body) {
          if (formStatus) {
            formStatus.textContent = "Write a thought before posting.";
            formStatus.dataset.state = "error";
          } else setForumStatus("Write a thought before posting.", "error");
          return;
        }
        if (!anonymous && !displayName) {
          if (formStatus) {
            formStatus.textContent = "Add a display name, or choose anonymous.";
            formStatus.dataset.state = "error";
          } else setForumStatus("Add a display name, or choose anonymous.", "error");
          return;
        }
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;
        if (formStatus) formStatus.textContent = "Posting…";
        else setForumStatus("Posting your note…");

        try {
          const payload = {
            author_id: forumUser.id,
            author_name: displayName.slice(0, 40),
            is_anonymous: anonymous,
            body
          };
          const request = postId
            ? forumClient.from("forum_replies").insert({ ...payload, post_id: postId })
            : forumClient.from("forum_posts").insert(payload);
          const { error } = await request;
          if (error) throw error;
          if (postId) {
            form.reset();
            updateIdentityControl(form);
            form.hidden = true;
            if (formStatus) {
              formStatus.textContent = "";
              delete formStatus.dataset.state;
            }
          } else {
            form.reset();
            updateMainIdentity();
            forumCharCount.textContent = "0 / 1200";
          }
          setForumStatus(postId ? "Your reply is posted." : "Your note is posted.", "success");
          await refreshForum(true);
        } catch (error) {
          const message = `Could not post: ${escapeForumError(error, "Please try again.")}`;
          if (formStatus) {
            formStatus.textContent = message;
            formStatus.dataset.state = "error";
          } else setForumStatus(message, "error");
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      }

      async function toggleForumLike(postId, button) {
        if (!forumClient || !forumUser) {
          setForumStatus("Connect Supabase to like a community note.", "error");
          return;
        }
        const liked = button.getAttribute("aria-pressed") === "true";
        button.disabled = true;
        try {
          const request = liked
            ? forumClient.from("forum_post_likes").delete().eq("post_id", postId).eq("user_id", forumUser.id)
            : forumClient.from("forum_post_likes").insert({ post_id: postId, user_id: forumUser.id });
          const { error } = await request;
          if (error) throw error;
          await refreshForum(true);
        } catch (error) {
          setForumFeedStatus(`Could not update like: ${escapeForumError(error, "Please try again.")}`, "error");
          button.disabled = false;
        }
      }

      async function toggleForumReplyLike(replyId, button) {
        if (!forumClient || !forumUser) {
          setForumStatus("Connect Supabase to like a reply.", "error");
          return;
        }
        const liked = button.getAttribute("aria-pressed") === "true";
        button.disabled = true;
        try {
          const request = liked
            ? forumClient.from("forum_reply_likes").delete().eq("reply_id", replyId).eq("user_id", forumUser.id)
            : forumClient.from("forum_reply_likes").insert({ reply_id: replyId, user_id: forumUser.id });
          const { error } = await request;
          if (error) throw error;
          await refreshForum(true);
        } catch (error) {
          setForumFeedStatus(`Could not update reply like: ${escapeForumError(error, "Please try again.")}`, "error");
          button.disabled = false;
        }
      }

      async function deleteForumPost(postId) {
        if (!forumClient || !forumUser) return;
        const { error } = await forumClient.from("forum_posts")
          .delete()
          .eq("id", postId)
          .eq("author_id", forumUser.id);
        if (error) {
          setForumFeedStatus(`Could not delete note: ${escapeForumError(error, "Please try again.")}`, "error");
          return;
        }
        await refreshForum(true);
      }

      forumAnonymous.addEventListener("change", updateMainIdentity);
      forumName.disabled = true;
      forumMessage.addEventListener("input", () => {
        forumCharCount.textContent = `${forumMessage.value.length} / 1200`;
      });
      forumForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitForumForm(forumForm);
      });
      forumRefresh.addEventListener("click", () => refreshForum());
      forumSort.addEventListener("change", renderForum);
      forumFeed.addEventListener("submit", (event) => {
        const form = event.target.closest(".forum-reply-form");
        if (!form) return;
        event.preventDefault();
        submitForumForm(form, form.dataset.postId);
      });
      forumFeed.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const { action, id } = button.dataset;
        if (action === "reply") {
          const form = button.closest(".forum-post")?.querySelector(".forum-reply-form");
          if (form) {
            form.hidden = !form.hidden;
            if (!form.hidden) form.querySelector('textarea[name="message"]').focus();
          }
        } else if (action === "like-post") {
          toggleForumLike(id, button);
        } else if (action === "like-reply") {
          toggleForumReplyLike(id, button);
        } else if (action === "delete-post") {
          if (window.confirm("Delete your note and its replies? This can’t be undone.")) deleteForumPost(id);
        }
      });
      updateMainIdentity();
      initializeForum();

      const historyMemes = [
        { topic: "The long edit", setup: "“I’ll just revise this one paragraph.”", reveal: "The Propaganda Movement has entered the chat with an entire newspaper.", tag: "PROPAGANDA MOVEMENT" },
        { topic: "Unexpected group project", setup: "You form a peaceful civic league…", reveal: "…and the colonial authorities decide your next destination is Dapitan.", tag: "LA LIGA FILIPINA" },
        { topic: "Exile productivity", setup: "The assignment: live in exile.", reveal: "Rizal: teaches, treats patients, farms, studies nature, and helps improve the town.", tag: "DAPITAN" },
        { topic: "Source checking", setup: "“Rizal led the Katipunan, right?”", reveal: "History note: no. Bonifacio led the Katipunan; Rizal’s reformist path was different.", tag: "REVOLUTION" },
        { topic: "The deadline", setup: "Me: “I have plenty of time to read Noli.”", reveal: "Also me, suddenly understanding why footnotes and page numbers matter.", tag: "THE NOVELS" },
        { topic: "A very long legacy", setup: "You finish the presentation and close the laptop.", reveal: "The big question stays open: what does serving your community look like now?", tag: "RIZAL’S LEGACY" },
        { topic: "The timeline quiz", setup: "July 1892: La Liga Filipina is founded.", reveal: "A few days later: Rizal is arrested and exiled. History does not wait for the next slide.", tag: "1892" },
        { topic: "BSIT history mode", setup: "“It’s only an old photograph.”", reveal: "Add context, a date, an accessible caption, and a source credit. Now it tells a story.", tag: "DIGITAL ARCHIVES" }
      ];

      const memeGrid = document.querySelector("#meme-grid");
      const memeShuffle = document.querySelector("#meme-shuffle");

      function renderMemes(items) {
        memeGrid.replaceChildren();
        items.forEach((meme, index) => {
          const card = createForumElement("article", "meme-card");
          card.dataset.reveal = "";

          const top = createForumElement("div", "meme-topline");
          top.append(createForumElement("span", "", "A HISTORY MEME"));
          top.append(createForumElement("span", "meme-stamp", String(index + 1).padStart(2, "0")));

          const middle = createForumElement("div", "meme-copy");
          middle.append(createForumElement("p", "meme-setup", meme.setup));
          middle.append(createForumElement("p", "meme-reveal", meme.reveal));

          const bottom = createForumElement("div", "meme-bottom");
          bottom.append(createForumElement("span", "meme-topic", meme.tag));
          const actions = createForumElement("span", "meme-actions");
          const reveal = createForumElement("button", "meme-action", "Reveal");
          reveal.type = "button";
          reveal.dataset.action = "reveal-meme";
          reveal.setAttribute("aria-expanded", "false");
          const copy = createForumElement("button", "meme-action", "Copy");
          copy.type = "button";
          copy.dataset.action = "copy-meme";
          copy.setAttribute("aria-label", `Copy meme about ${meme.tag}`);
          actions.append(reveal, copy);
          bottom.append(actions);

          const feedback = createForumElement("span", "sr-only", "");
          feedback.setAttribute("role", "status");
          card.append(top, middle, bottom, feedback);
          card.dataset.caption = `${meme.setup} ${meme.reveal}`;
          memeGrid.append(card);
          if (typeof revealObserver !== "undefined") revealObserver.observe(card);
        });
      }

      function shuffleMemes() {
        const shuffled = [...historyMemes];
        for (let index = shuffled.length - 1; index > 0; index -= 1) {
          const swapIndex = Math.floor(Math.random() * (index + 1));
          [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
        }
        renderMemes(shuffled);
      }

      memeGrid.addEventListener("click", async (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const card = button.closest(".meme-card");
        const feedback = card.querySelector('[role="status"]');
        if (button.dataset.action === "reveal-meme") {
          const isOpen = card.classList.toggle("is-open");
          button.setAttribute("aria-expanded", String(isOpen));
          button.textContent = isOpen ? "Hide" : "Reveal";
        } else if (button.dataset.action === "copy-meme") {
          try {
            if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable in this browser.");
            await navigator.clipboard.writeText(card.dataset.caption);
            feedback.textContent = "Meme caption copied.";
            button.textContent = "Copied";
            window.setTimeout(() => { button.textContent = "Copy"; }, 1600);
          } catch (error) {
            feedback.textContent = error.message || "Could not copy this caption.";
          }
        }
      });

      memeShuffle.addEventListener("click", shuffleMemes);
      renderMemes(historyMemes);

    async function loadBundledMusic() {
      try {
        const response = await fetch("/music/playlist.json");
        if (!response.ok) throw new Error(`Music playlist request failed (${response.status}).`);
        const playlistData = await response.json();
        if (!Array.isArray(playlistData.tracks)) {
          throw new Error("The music playlist must contain a tracks array.");
        }
        const tracks = playlistData.tracks.map((track, index) => {
          if (!track || typeof track.name !== "string" || !track.name.trim()) {
            throw new Error(`Music playlist track ${index + 1} needs a name.`);
          }
          if (typeof track.src !== "string" ||
              !/^\/music\/[^/\\%?#]+\.mp3$/i.test(track.src) ||
              track.src.includes("..") ||
              track.url ||
              track.platform) {
            throw new Error(`Music playlist track ${index + 1} needs a local MP3 path under /music/.`);
          }
          return {
            name: track.name.trim(),
            artist: typeof track.artist === "string" ? track.artist.trim() : "",
            url: track.src,
            duration: 0
          };
        });
        recordTracks.push(...tracks);
        if (recordTracks.length > 0) {
          selectAudioTrack(0);
          showAudioMessage(`Loaded ${recordTracks.length} song${recordTracks.length === 1 ? "" : "s"} from the project playlist.`);
        }
        renderPlaylist();
        updateAudioControls();
      } catch (error) {
        console.error("Could not load the project music playlist.", error);
        showAudioMessage(`${error.message || "Could not load the project music playlist."} Check public/music/playlist.json.`, true);
      }
    }

    togglePlayback.addEventListener("click", () => {
      if (audioPlayer.paused) startAudioPlayback();
      else audioPlayer.pause();
    });
    recordPlatter.addEventListener("click", () => {
      if (audioPlayer.paused) startAudioPlayback();
      else audioPlayer.pause();
    });

    function skipTrack(direction) {
      if (recordTracks.length < 2) return;
      const nextIndex = (selectedTrack + direction + recordTracks.length) % recordTracks.length;
      selectAudioTrack(nextIndex, true);
    }

    previousTrack.addEventListener("click", () => skipTrack(-1));
    nextTrack.addEventListener("click", () => skipTrack(1));

    audioPlayer.addEventListener("play", () => {
      if (selectedTrack >= 0) playerStatus.textContent = `Now playing · ${recordTracks[selectedTrack].name}`;
      updateAudioControls();
    });
    audioPlayer.addEventListener("pause", () => {
      if (selectedTrack >= 0 && audioPlayer.currentTime > 0 && !audioPlayer.ended) {
        playerStatus.textContent = `Paused · ${recordTracks[selectedTrack].name}`;
      }
      updateAudioControls();
    });
    audioPlayer.addEventListener("loadedmetadata", () => {
      if (selectedTrack < 0) return;
      const track = recordTracks[selectedTrack];
      track.duration = Number.isFinite(audioPlayer.duration) ? audioPlayer.duration : 0;
      durationLabel.textContent = formatAudioTime(track.duration);
      renderPlaylist();
    });
    audioPlayer.addEventListener("timeupdate", () => {
      const duration = audioPlayer.duration;
      const position = Number.isFinite(duration) && duration > 0 ? audioPlayer.currentTime / duration : 0;
      audioSeek.value = String(Math.round(position * 1000));
      audioSeek.style.setProperty("--slider-progress", `${position * 100}%`);
      audioSeek.setAttribute("aria-valuetext", `${formatAudioTime(audioPlayer.currentTime)} elapsed`);
      currentTimeLabel.textContent = formatAudioTime(audioPlayer.currentTime);
    });
    audioPlayer.addEventListener("ended", () => {
      if (recordTracks.length > 1 && selectedTrack < recordTracks.length - 1) {
        selectAudioTrack(selectedTrack + 1, true);
      } else {
        playerStatus.textContent = "Side finished · choose another record";
        updateAudioControls();
      }
    });
    audioPlayer.addEventListener("error", () => {
      if (selectedTrack < 0 || !audioPlayer.error) return;
      const messages = {
        1: "Playback was interrupted.",
        2: "A problem occurred while reading this audio file.",
        3: "This audio format could not be decoded by your browser.",
        4: "This audio format is not supported by your browser."
      };
      const message = messages[audioPlayer.error.code] || "This audio file could not be played.";
      playerStatus.textContent = "Unable to play this record";
      showAudioMessage(`${message} Try another audio format.`, true);
      updateAudioControls();
    });

    audioSeek.addEventListener("input", () => {
      if (!Number.isFinite(audioPlayer.duration) || audioPlayer.duration <= 0) return;
      audioPlayer.currentTime = (Number(audioSeek.value) / 1000) * audioPlayer.duration;
    });
    audioVolume.addEventListener("input", () => {
      audioPlayer.volume = Number(audioVolume.value);
      audioVolume.style.setProperty("--slider-progress", `${Number(audioVolume.value) * 100}%`);
    });
    audioVolume.style.setProperty("--slider-progress", `${Number(audioVolume.value) * 100}%`);
    renderPlaylist();
    updateAudioControls();
    loadBundledMusic();
