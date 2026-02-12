use clap::Parser;
use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode, KeyEventKind},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::{
    backend::{Backend, CrosstermBackend},
    layout::{Constraint, Direction, Layout, Rect},
    style::{Color, Modifier, Style},
    text::{Line, Span},
    widgets::{Block, Borders, Clear, Paragraph, Tabs},
    Frame, Terminal,
};
use std::{
    collections::HashMap,
    error::Error,
    io,
    time::{Duration, Instant},
};

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Use vim-style hjkl navigation
    #[arg(long)]
    vim_motions: bool,

    /// Output emoji text codes instead of unicode
    #[arg(long)]
    text: bool,

    /// Output unicode (default)
    #[arg(long)]
    unicode: bool,
}

#[derive(Debug, Clone)]
struct Emoji {
    name: String,
    unicode: String,
}

struct Category {
    name: String,
    emojis: Vec<Emoji>,
}

struct App {
    categories: Vec<Category>,
    current_category: usize,
    selected_emoji: usize,
    scroll_offset: usize,
    vim_motions: bool,
    output_text: bool,
    show_popup: bool,
    popup_timer: Option<Instant>,
    last_selected: Option<usize>,
}

impl App {
    fn new(vim_motions: bool, output_text: bool) -> Self {
        let categories = load_categories();
        Self {
            categories,
            current_category: 0,
            selected_emoji: 0,
            scroll_offset: 0,
            vim_motions,
            output_text,
            show_popup: false,
            popup_timer: None,
            last_selected: None,
        }
    }

    fn next_category(&mut self) {
        self.current_category = (self.current_category + 1) % self.categories.len();
        self.selected_emoji = 0;
        self.scroll_offset = 0;
        self.hide_popup();
    }

    fn previous_category(&mut self) {
        if self.current_category > 0 {
            self.current_category -= 1;
        } else {
            self.current_category = self.categories.len() - 1;
        }
        self.selected_emoji = 0;
        self.scroll_offset = 0;
        self.hide_popup();
    }

    fn next_emoji(&mut self) {
        let current_category = &self.categories[self.current_category];
        if self.selected_emoji < current_category.emojis.len().saturating_sub(1) {
            self.selected_emoji += 1;
        }
        self.check_popup();
    }

    fn previous_emoji(&mut self) {
        if self.selected_emoji > 0 {
            self.selected_emoji -= 1;
        }
        self.check_popup();
    }

    fn right_emoji(&mut self) {
        let current_category = &self.categories[self.current_category];
        let new_pos = self.selected_emoji + 1;
        if new_pos < current_category.emojis.len() {
            self.selected_emoji = new_pos;
        }
        self.check_popup();
    }

    fn left_emoji(&mut self) {
        if self.selected_emoji > 0 {
            self.selected_emoji -= 1;
        }
        self.check_popup();
    }

    fn down_emoji(&mut self) {
        let current_category = &self.categories[self.current_category];
        let cols = 9;
        let new_pos = self.selected_emoji + cols;
        if new_pos < current_category.emojis.len() {
            self.selected_emoji = new_pos;
        }
        self.check_popup();
    }

    fn up_emoji(&mut self) {
        let cols = 9;
        if self.selected_emoji >= cols {
            self.selected_emoji -= cols;
        }
        self.check_popup();
    }

    fn check_popup(&mut self) {
        if let Some(last) = self.last_selected {
            if last == self.selected_emoji {
                self.popup_timer = Some(Instant::now());
            } else {
                self.hide_popup();
            }
        }
        self.last_selected = Some(self.selected_emoji);
    }

    fn hide_popup(&mut self) {
        self.show_popup = false;
        self.popup_timer = None;
        self.last_selected = None;
    }

    fn update_popup(&mut self) {
        if let Some(timer) = self.popup_timer {
            if timer.elapsed() > Duration::from_millis(1000) {
                self.show_popup = true;
            }
        }
    }

    fn get_selected_emoji(&self) -> Option<&Emoji> {
        self.categories
            .get(self.current_category)?
            .emojis
            .get(self.selected_emoji)
    }

    fn get_output(&self) -> String {
        if let Some(emoji) = self.get_selected_emoji() {
            if self.output_text {
                format!(":{}", emoji.name)
            } else {
                emoji.unicode.clone()
            }
        } else {
            String::new()
        }
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let args = Args::parse();
    
    let output_text = args.text; // Only output text if explicitly requested
    
    // Setup terminal
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    // Create app and run it
    let mut app = App::new(args.vim_motions, output_text);
    let res = run_app(&mut terminal, &mut app);

    // Restore terminal
    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    terminal.show_cursor()?;

    if let Err(err) = res {
        println!("{:?}", err);
    }

    Ok(())
}

fn run_app<B: Backend>(terminal: &mut Terminal<B>, app: &mut App) -> io::Result<()> {
    loop {
        terminal.draw(|f| ui(f, app))?;
        app.update_popup();

        if crossterm::event::poll(Duration::from_millis(100))? {
            if let Event::Key(key) = event::read()? {
                if key.kind == KeyEventKind::Press {
                    match key.code {
                        KeyCode::Char('q') | KeyCode::Esc => return Ok(()),
                        KeyCode::Enter => {
                            print!("{}", app.get_output());
                            return Ok(());
                        }
                        KeyCode::Tab => app.next_category(),
                        KeyCode::BackTab => app.previous_category(),
                        KeyCode::Up => app.up_emoji(),
                        KeyCode::Down => app.down_emoji(),
                        KeyCode::Left => app.left_emoji(),
                        KeyCode::Right => app.right_emoji(),
                        KeyCode::Char('h') if app.vim_motions => app.left_emoji(),
                        KeyCode::Char('j') if app.vim_motions => app.down_emoji(),
                        KeyCode::Char('k') if app.vim_motions => app.up_emoji(),
                        KeyCode::Char('l') if app.vim_motions => app.right_emoji(),
                        _ => {}
                    }
                }
            }
        }
    }
}

fn ui(f: &mut Frame, app: &mut App) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([Constraint::Length(3), Constraint::Min(0)].as_ref())
        .split(f.size());

    // Render tabs
    let titles: Vec<Line> = app
        .categories
        .iter()
        .map(|c| Line::from(c.name.as_str()))
        .collect();
    let tabs = Tabs::new(titles)
        .block(Block::default().borders(Borders::ALL).title("Categories"))
        .select(app.current_category)
        .style(Style::default().fg(Color::White))
        .highlight_style(Style::default().fg(Color::Yellow).add_modifier(Modifier::BOLD));
    f.render_widget(tabs, chunks[0]);

    // Render emoji grid
    let current_category = &app.categories[app.current_category];
    let emoji_area = chunks[1];
    
    let cols = 9;
    let rows = ((emoji_area.height - 2) as usize).max(1); // Account for borders
    let visible_items = cols * rows;
    
    // Calculate scroll offset
    let selected_row = app.selected_emoji / cols;
    if selected_row >= app.scroll_offset + rows {
        app.scroll_offset = selected_row - rows + 1;
    } else if selected_row < app.scroll_offset {
        app.scroll_offset = selected_row;
    }
    
    let start_idx = app.scroll_offset * cols;
    let end_idx = (start_idx + visible_items).min(current_category.emojis.len());
    
    let mut lines = Vec::new();
    for chunk in current_category.emojis[start_idx..end_idx].chunks(cols) {
        let mut spans = Vec::new();
        for (i, emoji) in chunk.iter().enumerate() {
            let global_idx = start_idx + (lines.len() * cols) + i;
            let style = if global_idx == app.selected_emoji {
                Style::default().bg(Color::Blue).fg(Color::White)
            } else {
                Style::default()
            };
            spans.push(Span::styled(format!("{} ", emoji.unicode), style));
        }
        lines.push(Line::from(spans));
    }
    
    let emoji_list = Paragraph::new(lines)
        .block(Block::default().borders(Borders::ALL).title("Emojis"))
        .style(Style::default().fg(Color::White));
    f.render_widget(emoji_list, emoji_area);

    // Render popup if needed
    if app.show_popup {
        if let Some(emoji) = app.get_selected_emoji() {
            let popup_area = centered_rect(30, 3, f.size());
            f.render_widget(Clear, popup_area);
            let popup = Paragraph::new(format!(":{}", emoji.name))
                .block(Block::default().borders(Borders::ALL).title("Emoji Name"))
                .style(Style::default().fg(Color::Yellow));
            f.render_widget(popup, popup_area);
        }
    }
}

fn centered_rect(percent_x: u16, height: u16, r: Rect) -> Rect {
    let popup_layout = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Percentage((100 - height) / 2),
            Constraint::Length(height),
            Constraint::Percentage((100 - height) / 2),
        ])
        .split(r);

    Layout::default()
        .direction(Direction::Horizontal)
        .constraints([
            Constraint::Percentage((100 - percent_x) / 2),
            Constraint::Percentage(percent_x),
            Constraint::Percentage((100 - percent_x) / 2),
        ])
        .split(popup_layout[1])[1]
}

fn load_categories() -> Vec<Category> {
    let emoji_map = create_emoji_map();
    
    let raw_categories = [
        ("Smileys & Emotions", vec![
            "grinning", "smile", "happy", "grin", "amused", "sweat_smile", "rolling_on_the_floor_laughing",
            "haha", "slightly_smiling_face", "upside_down_face", "wink", "blush", "innocent",
            "smiling_face_with_three_hearts", "heart_eyes", "grinning_face_with_star_eyes", "kissing_heart",
            "kissing", "relaxed", "kissing_closed_eyes", "kissing_smiling_eyes", "tear_smile", "savour",
            "stuck_out_tongue", "stuck_out_tongue_winking_eye", "grinning_face_with_one_large_and_one_small_eye",
            "stuck_out_tongue_closed_eyes", "money_mouth_face", "hugging_face", "smiling_face_with_smiling_eyes_and_hand_covering_mouth",
            "face_with_finger_covering_closed_lips", "thinking_face", "zipper_mouth_face", "face_with_one_eyebrow_raised",
            "neutral_face", "expressionless", "no_mouth", "smirk", "unamused", "face_with_rolling_eyes",
            "grimacing", "lying_face", "relieved", "pensive", "sleepy", "drooling_face", "sleeping",
            "mask", "face_with_thermometer", "face_with_head_bandage", "nauseated_face", "face_with_open_mouth_vomiting",
            "sneezing_face", "overheating", "freezing", "woozy_face", "dizzy_face", "shocked_face_with_exploding_head",
            "face_with_cowboy_hat", "partying_face", "disguised_face", "confident", "nerd_face", "face_with_monocle",
            "confused", "worried", "slightly_frowning_face", "frowning_face", "open_mouth", "hushed",
            "astonished", "flushed", "pleading_face", "bored", "anguished", "fearful", "cold_sweat",
            "disappointed_relieved", "cry", "distressed", "scream", "confounded", "persevere", "disappointed",
            "sweat", "weary", "tired_face", "yawning_face", "triumph", "pout", "angry", "serious_face_with_symbols_covering_mouth",
            "smiling_imp", "angry_imp", "skull", "skull_and_crossbones", "poop", "clown_face", "japanese_ogre",
            "japanese_goblin", "ghost", "alien", "alien_monster", "robot_face", "smiling_cat", "grinning_cat",
            "joyful_cat", "heart_eyes_cat", "smirk_cat", "kissing_cat", "weary_cat", "crying_cat_face",
            "pouting_cat", "see_no_evil", "hear_no_evil", "speak_no_evil", "kiss_lips", "love_letter",
            "cupid", "heart_ribbon", "sparkling_heart", "heartpulse", "heartbeat", "revolving_hearts",
            "two_hearts", "heart_decoration", "heavy_heart_exclamation", "broken_heart", "heart",
            "orange_heart", "yellow_heart", "green_heart", "blue_heart", "purple_heart", "brown_heart",
            "black_heart", "white_heart", "100", "anger", "collision", "dizzy_star", "sweat_drops",
            "dash", "hole", "bomb", "speech_balloon", "left_speech_bubble", "right_anger_bubble",
            "thought_balloon", "zzz"
        ]),
        ("People", vec![
            "wave", "raised_back_of_hand", "raised_hand_with_fingers_splayed", "raised_hand", "vulcan_salute",
            "ok_hand", "pinched_fingers", "pinching_hand", "victory", "hand_with_index_and_middle_fingers_crossed",
            "i_love_you_hand_sign", "sign_of_the_horns", "call_me_hand", "point_left", "point_right",
            "backhand_point_up", "reversed_hand_with_middle_finger_extended", "point_down", "point_up",
            "thumbsup", "thumbsdown", "fist", "fist_oncoming", "left_facing_fist", "right_facing_fist",
            "clap", "raised_hands", "open_hands", "palms_up_together", "handshake", "pray", "writing_hand",
            "nail_care", "selfie", "right_bicep", "mechanical_arm", "mechanical_leg", "leg", "foot",
            "ear", "ear_with_hearing_aid", "nose", "brain", "anatomical_heart", "lungs", "tooth",
            "bone", "eyes", "eye", "tongue", "lips", "baby", "child", "boy", "girl", "adult",
            "person_with_blond_hair", "man", "bearded_person", "red_haired_man", "curly_haired_man",
            "white_haired_man", "bald_man", "woman", "red_haired_woman", "red_haired_person",
            "curly_haired_woman", "curly_haired_person", "white_haired_woman", "white_haired_person",
            "bald_woman", "bald_person", "blond_haired_woman", "blond_haired_man", "older_adult",
            "older_man", "older_woman"
        ]),
        ("Animals & Nature", vec![
            "monkey_face", "monkey", "gorilla", "orangutan", "dog_face", "dog", "guide_dog", "service_dog",
            "poodle", "wolf_face", "fox_face", "raccoon", "cat_face", "cat", "black_cat", "lion_face",
            "tiger_face", "tiger", "leopard", "horse_face", "horse", "unicorn_face", "zebra_face",
            "deer", "bison", "cow_face", "ox", "water_buffalo", "cow", "pig_face", "pig", "boar",
            "pig_nose", "ram", "sheep", "goat", "dromedary_camel", "two_hump_camel", "llama",
            "giraffe_face", "elephant", "mammoth", "rhinoceros", "hippopotamus", "mouse_face",
            "mouse", "rat", "hamster_face", "rabbit_face", "rabbit", "chipmunk", "beaver",
            "hedgehog", "bat", "bear_face", "polar_bear_face", "koala", "panda_face", "sloth",
            "otter", "skunk", "kangaroo", "badger", "paw_prints", "turkey", "chicken", "rooster",
            "hatching_chick", "baby_chick", "hatched_chick", "bird", "penguin", "dove", "eagle",
            "duck", "swan", "owl", "dodo", "feather", "flamingo", "peacock", "parrot", "frog_face",
            "crocodile", "turtle", "lizard", "snake", "dragon_face", "dragon", "sauropod", "trex",
            "spouting_whale", "whale", "dolphin", "seal", "fish", "tropical_fish", "blowfish",
            "shark", "octopus", "shell", "snail", "butterfly", "bug", "ant", "honeybee", "beetle",
            "lady_bug", "cricket", "cockroach", "spider", "spider_web", "scorpion", "mosquito",
            "fly", "worm", "microbe", "bouquet", "cherry_blossom", "white_flower", "rosette",
            "rose", "wilted_flower", "hibiscus", "sunflower", "blossom", "tulip", "seedling",
            "potted_plant", "evergreen_tree", "deciduous_tree", "palm_tree", "cactus", "ear_of_rice",
            "herb", "shamrock", "four_leaf_clover", "maple_leaf", "fallen_leaf", "leaves"
        ]),
        ("Food & Drink", vec![
            "coffee", "grapes", "melon", "watermelon", "tangerine", "lemon", "banana", "pineapple",
            "mango", "apple", "green_apple", "pear", "peach", "cherries", "strawberry", "blueberry",
            "kiwifruit", "tomato", "olive", "coconut", "avocado", "eggplant", "potato", "carrot",
            "corn", "hot_pepper", "bell_pepper", "cucumber", "leafy_green", "broccoli", "garlic",
            "onion", "mushroom", "peanuts", "chestnut", "bread", "croissant", "baguette_bread",
            "flatbread", "pretzel", "bagel", "pancakes", "waffle", "cheese_wedge", "meat_on_bone",
            "poultry_leg", "cut_of_meat", "bacon", "hamburger", "fries", "pizza", "hotdog",
            "sandwich", "taco", "burrito", "tamale", "stuffed_flatbread", "falafel", "egg",
            "cooking", "shallow_pan_of_food", "stew", "fondue", "bowl_with_spoon", "green_salad",
            "popcorn", "butter", "salt", "canned_food", "bento", "rice_cracker", "rice_ball",
            "rice", "curry", "ramen", "spaghetti", "sweet_potato", "oden", "sushi", "fried_shrimp",
            "fish_cake", "moon_cake", "dango", "dumpling", "fortune_cookie", "takeout_box",
            "crab", "lobster", "shrimp", "squid", "oyster", "icecream", "shaved_ice", "ice_cream",
            "doughnut", "cookie", "birthday", "cake", "cupcake", "pie", "chocolate_bar", "candy",
            "lollipop", "custard", "honey_pot", "baby_bottle", "glass_of_milk", "teapot", "tea",
            "sake", "champagne", "wine_glass", "cocktail", "tropical_drink", "beer", "beers",
            "clinking_glasses", "tumbler_glass", "cup_with_straw", "bubble_tea", "beverage_box",
            "mate_drink", "ice_cube", "chopsticks", "fork_knife_plate", "fork_and_knife", "spoon",
            "hocho", "amphora"
        ]),
        ("Travel & Places", vec![
            "umbrella_with_rain_drops", "anchor", "earth_africa", "earth_americas", "earth_asia",
            "globe_with_meridians", "world_map", "japan", "compass", "snowy_mountain", "mountain",
            "volcano", "mount_fuji", "camping", "beach", "desert", "desert_island", "national_park",
            "stadium", "classical_building", "building_construction", "brick", "rock", "wood",
            "hut", "houses", "derelict_house", "house", "house_with_garden", "office", "ja_post_office",
            "european_post_office", "hospital", "bank", "hotel", "love_hotel", "convenience_store",
            "school", "department_store", "factory", "japanese_castle", "european_castle", "wedding",
            "tokyo_tower", "statue_of_liberty", "church", "mosque", "hindu_temple", "synagogue",
            "shinto_shrine", "kaaba", "fountain", "tent", "foggy", "night_with_stars", "cityscape",
            "sunrise_over_mountains", "sunrise", "city_sunset", "sunset", "bridge_at_night",
            "hotsprings", "carousel_horse", "ferris_wheel", "roller_coaster", "barber", "circus_tent",
            "steam_locomotive", "railway_car", "bullettrain_side", "bullettrain_front", "train",
            "metro", "light_rail", "station", "tram", "monorail", "mountain_railway", "tram_car",
            "bus", "oncoming_bus", "trolleybus", "minibus", "ambulance", "fire_engine", "police_car",
            "oncoming_police_car", "taxi", "oncoming_taxi", "red_car", "oncoming_automobile",
            "blue_car", "pickup_truck", "truck", "articulated_lorry", "tractor", "racing_car",
            "motorcycle", "motor_scooter", "manual_wheelchair", "motorized_wheelchair", "auto_rickshaw",
            "bike", "scooter", "skateboard", "roller_skate", "bus_stop", "motorway", "railway_track",
            "oil_drum", "fuel_pump", "police_light", "traffic_light", "vertical_traffic_light",
            "octagonal_sign", "construction", "sailboat", "canoe", "speedboat", "passenger_ship",
            "ferry", "motor_boat", "ship", "airplane", "small_airplane", "airplane_departure",
            "airplane_arriving", "parachute", "seat", "helicopter", "suspension_railway",
            "mountain_cableway", "aerial_tramway", "satellite", "rocket", "flying_saucer",
            "bellhop_bell", "luggage", "hourglass", "hourglass_flowing_sand", "watch", "alarm_clock",
            "stopwatch", "timer_clock", "mantelpiece_clock"
        ]),
        ("Activities", vec![
            "sparkles", "jack_o_lantern", "christmas_tree", "fireworks", "sparkler", "firecracker",
            "balloon", "party", "confetti_ball", "tanabata_tree", "pine_decor", "dolls",
            "carp_streamer", "wind_chime", "moon_ceremony", "red_envelope", "ribbon", "gift",
            "reminder_ribbon", "admission", "ticket", "military_medal", "trophy", "sports_medal",
            "first_place_medal", "second_place_medal", "third_place_medal", "soccer", "baseball",
            "softball", "basketball", "volleyball", "football", "rugby_football", "tennis",
            "flying_disc", "bowling", "cricket_bat_and_ball", "field_hockey_stick_and_ball",
            "ice_hockey_stick_and_puck", "lacrosse", "table_tennis_paddle_and_ball", "badminton_racquet_and_shuttlecock",
            "boxing_glove", "martial_arts_uniform", "goal_net", "golf", "ice_skate", "fishing_pole_and_fish",
            "diving_mask", "running_shirt_with_sash", "ski", "sled", "curling_stone", "dart",
            "yoyo", "kite", "8ball", "crystal_ball", "wand", "nazar_amulet", "video_game",
            "joystick", "slot_machine", "game_die", "puzzle_piece", "teddy_bear", "pinata",
            "nesting_dolls", "spades", "hearts", "diamonds", "clubs", "chess_pawn", "black_joker",
            "mahjong", "flower_playing_cards", "performing_arts", "framed_picture", "palette",
            "thread", "sewing_needle", "yarn", "knot"
        ]),
        ("Objects", vec![
            "eyeglasses", "dark_sunglasses", "goggles", "lab_coat", "safety_vest", "necktie",
            "tshirt", "jeans", "scarf", "gloves", "coat", "socks", "dress", "kimono", "sari",
            "one_piece_swimsuit", "briefs", "shorts", "bikini", "womans_clothes", "purse",
            "handbag", "pouch", "shopping_bags", "school_satchel", "sandal", "mans_shoe",
            "athletic_shoe", "hiking_boot", "flat_shoe", "high_heel", "womans_sandal", "ballet_shoes",
            "womans_boot", "crown", "womans_hat", "top_hat", "graduation_cap", "billed_cap",
            "military_helmet", "helmet_cross", "prayer_beads", "lipstick", "ring", "gem",
            "no_sound", "speaker", "sound", "loud_sound", "loudspeaker", "megaphone", "postal_horn",
            "bell", "no_bell", "musical_score", "musical_note", "musical_notes", "studio_microphone",
            "level_slider", "control_knobs", "microphone", "headphones", "radio", "saxophone",
            "accordion", "guitar", "musical_keyboard", "trumpet", "violin", "banjo", "drum_with_drumsticks",
            "long_drum", "mobile", "mobile_calling", "telephone", "telephone_receiver", "pager",
            "fax", "battery", "electric_plug", "laptop", "desktop_computer", "printer", "keyboard",
            "computer_mouse", "trackball", "minidisc", "floppy_disk", "disk", "dvd", "abacus",
            "movie_camera", "film_frames", "film_projector", "clapper", "tv", "camera", "camera_with_flash",
            "video_camera", "vhs", "mag", "mag_right", "candle", "light_bulb", "flashlight",
            "izakaya_lantern", "diya_lamp", "notebook_with_decorative_cover", "closed_book",
            "open_book", "green_book", "blue_book", "orange_book", "books", "notebook", "ledger",
            "page_with_curl", "scroll", "page_facing_up", "newspaper", "rolled_newspaper",
            "bookmark_tabs", "bookmark", "label", "moneybag", "coin", "yen", "dollar", "euro",
            "pound", "money_with_wings", "credit_card", "receipt", "ja_chart", "envelope",
            "email", "incoming_envelope", "envelope_with_arrow", "outbox_tray", "inbox_tray",
            "package", "mailbox", "mailbox_closed", "mailbox_with_mail", "mailbox_with_no_mail",
            "postbox", "ballot_box", "pencil", "black_nib", "fountain_pen", "pen", "paintbrush",
            "crayon", "memo", "briefcase", "file_folder", "open_file_folder", "card_index_dividers",
            "calendar", "torn_calendar", "spiral_notepad", "spiral_calendar", "card_index",
            "chart_with_upwards_trend", "chart_with_downwards_trend", "bar_chart", "clipboard",
            "pushpin", "round_pushpin", "paperclip", "paperclips", "straight_ruler", "triangular_ruler",
            "scissors", "card_file_box", "file_cabinet", "wastebasket", "lock", "unlock",
            "lock_with_ink_pen", "closed_lock_with_key", "key", "old_key", "hammer", "axe",
            "pick", "hammer_and_pick", "hammer_and_wrench", "dagger", "crossed_swords", "pistol",
            "boomerang", "bow_and_arrow", "shield", "saw", "wrench", "screwdriver", "nut_and_bolt",
            "gear", "compression", "scales", "probing_cane", "link", "chains", "hook", "toolbox",
            "magnet", "ladder", "alembic", "test_tube", "petri_dish", "double_helix", "microscope",
            "telescope", "satellite_antenna", "syringe", "drop_of_blood", "pill", "adhesive_bandage",
            "stethoscope", "door", "elevator", "mirror", "window", "bed", "couch_and_lamp",
            "chair", "toilet", "plunger", "shower", "bathtub", "mouse_trap", "razor",
            "lotion_bottle", "safety_pin", "broom", "basket", "roll_of_paper", "bucket",
            "soap", "toothbrush", "sponge", "fire_extinguisher", "shopping_trolley", "smoking",
            "coffin", "headstone", "funeral_urn", "moyai", "placard"
        ]),
        ("Symbols", vec![
            "aries", "taurus", "sagittarius", "capricorn", "aquarius", "pisces", "white_check_mark",
            "question", "white_question", "white_exclamation", "heavy_exclamation_mark", "heavy_plus_sign",
            "heavy_minus_sign", "heavy_division_sign", "atm", "put_litter_in_its_place", "potable_water",
            "handicapped", "mens", "womens", "restroom", "baby_symbol", "wc", "passport_control",
            "customs", "baggage_claim", "left_luggage", "warning", "children_crossing", "no_entry",
            "no_entry_sign", "no_bicycles", "no_smoking", "do_not_litter", "non_potable_water",
            "no_pedestrians", "no_mobile_phones", "underage", "radioactive", "biohazard", "arrow_up",
            "arrow_upper_right", "arrow_right", "arrow_lower_right", "arrow_down", "arrow_lower_left",
            "arrow_left", "arrow_upper_left", "arrow_up_down", "left_right_arrow", "leftwards_arrow_with_hook",
            "arrow_right_hook", "arrow_heading_up", "arrow_heading_down", "clockwise", "arrows_counterclockwise",
            "back", "end", "on", "soon", "top", "place_of_worship", "atom_symbol", "om_symbol",
            "star_of_david", "wheel_of_dharma", "yin_yang", "latin_cross", "orthodox_cross",
            "star_and_crescent", "peace_symbol", "menorah_with_nine_branches", "six_pointed_star",
            "gemini", "cancer", "leo", "virgo", "libra", "scorpius", "ophiuchus", "twisted_rightwards_arrows",
            "repeat", "repeat_single", "arrow_forward", "fast_forward", "next_track_button",
            "play_or_pause_button", "reverse", "rewind", "previous_track_button", "arrow_up_small",
            "arrow_double_up", "arrow_down_small", "arrow_double_down", "pause_button", "stop",
            "record", "eject_button", "cinema", "low_brightness", "high_brightness", "antenna_bars",
            "vibration_mode", "mobile_phone_off", "female_sign", "male_sign", "trans", "heavy_multiplication_x",
            "infinity", "double_exclamation", "exclamation_question", "wavy_dash", "currency_exchange",
            "heavy_dollar_sign", "medical", "recycle", "fleur-de-lis", "trident", "name_badge",
            "ja_beginner", "o", "ballot_box_with_check", "heavy_check_mark", "cross_mark",
            "negative_squared_cross_mark", "curly_loop", "double_curly_loop", "part_alternation_mark",
            "eight_spoked_asterisk", "eight_pointed_black_star", "sparkle", "tm", "keycap_ten",
            "capital_abcd", "abcd", "1234", "symbols", "abc", "a_blood", "ab_blood", "b_blood",
            "cl", "cool", "free", "information_source", "id", "m", "new", "ng", "o_blood",
            "ok", "parking", "sos", "up", "vs", "koko", "ja_service_charge", "ja_monthly_amount",
            "ja_not_free_of_carge", "ja_reserved", "ideograph_advantage", "ja_discount",
            "ja_free_of_charge", "ja_prohibited", "accept", "ja_application", "ja_passing_grade",
            "u7a7a", "ja_congratulations", "ja_secret", "ja_open_for_business", "ja_no_vacancy",
            "red_circle", "large_orange_circle", "large_yellow_circle", "large_green_circle",
            "large_blue_circle", "large_purple_circle", "large_brown_circle", "black_circle",
            "white_circle", "large_red_square", "large_orange_square", "large_yellow_square",
            "large_green_square", "large_blue_square", "large_purple_square", "large_brown_square",
            "black_large_square", "white_large_square", "black_medium_square", "white_medium_square",
            "black_medium_small_square", "white_medium_small_square", "black_small_square",
            "white_small_square", "large_orange_diamond", "large_blue_diamond", "small_orange_diamond",
            "small_blue_diamond", "up_red_triangle", "down_red_triangle", "diamond_shape_with_a_dot_inside",
            "radio_button", "white_square_button", "black_square_button"
        ]),
        ("Flags", vec![
            "checkered_flag", "triangular_flag_on_post", "crossed_flags", "waving_black_flag",
            "white_flag", "rainbow_flag", "trans_flag", "pirate_flag", "ascension_island",
            "flag_ad", "united_arab_emirates", "afghanistan", "antigua_barbuda", "anguilla",
            "flag_al", "flag_am", "flag_ao", "antarctica", "argentina", "american_samoa",
            "flag_at", "australia", "flag_aw", "aland_islands", "azerbaijan", "bosnia_herzegovina",
            "barbados", "bangladesh", "flag_be", "burkina_faso", "bulgaria", "flag_bh",
            "flag_bi", "flag_bj", "st_barthelemy", "flag_bm", "flag_bn", "flag_bo",
            "caribbean_netherlands", "flag_br", "flag_bs", "flag_bt", "bouvet_island",
            "botswana", "belarus", "flag_bz", "flag_ca", "cocos_islands", "congo_kinshasa",
            "central_african_republic", "congo_brazzaville", "switzerland", "cote_divoire",
            "cook_islands", "flag_cl", "cameroon", "flag_cn", "colombia", "clipperton_island",
            "costa_rica", "flag_cu", "cape_verde", "flag_cw", "christmas_island", "flag_cy",
            "flag_cz", "flag_de", "diego_garcia", "djibouti", "flag_dk", "dominica",
            "dominican_republic", "algeria", "ceuta_melilla", "flag_ec", "estonia", "flag_eg",
            "western_sahara", "flag_er", "flag_es", "ethiopia", "european_union", "flag_fi",
            "flag_fj", "falkland_islands", "micronesia", "faroe_islands", "flag_fr", "flag_ga",
            "flag_gb", "flag_gd", "flag_ge", "french_guiana", "guernsey", "flag_gh",
            "gibraltar", "greenland", "flag_gm", "flag_gn", "guadeloupe", "equatorial_guinea",
            "flag_gr", "south_georgia_south_sandwich_islands", "guatemala", "flag_gu",
            "guinea_bissau", "flag_gy", "hong_kong", "heard_mcdonald_islands", "honduras",
            "croatia", "flag_ht", "flag_hu", "canary_islands", "indonesia", "flag_ie",
            "flag_il", "isle_of_man", "flag_in", "british_indian_ocean_territory", "flag_iq",
            "flag_ir", "iceland", "flag_it", "flag_je", "flag_jm", "flag_jo", "flag_jp",
            "flag_ke", "kyrgyzstan", "cambodia", "kiribati", "comoros", "st_kitts_nevis",
            "north_korea", "flag_kr", "flag_kw", "cayman_islands", "kazakhstan", "flag_la",
            "flag_lb", "st_lucia", "liechtenstein", "sri_lanka", "flag_lr", "flag_ls",
            "lithuania", "luxembourg", "flag_lv", "flag_ly", "morocco", "flag_mc", "flag_md",
            "montenegro", "st_martin", "madagascar", "marshall_islands", "macedonia", "flag_ml",
            "flag_mm", "mongolia", "flag_mo", "northern_mariana_islands", "martinique",
            "mauritania", "montserrat", "flag_mt", "mauritius", "maldives", "flag_mw",
            "flag_mx", "malaysia", "mozambique", "flag_na", "new_caledonia", "flag_ne",
            "norfolk_island", "flag_ng", "nicaragua", "netherlands", "flag_no", "flag_np",
            "flag_nr", "flag_nu", "new_zealand", "flag_om", "flag_pa", "flag_pe",
            "french_polynesia", "papua_new_guinea", "philippines", "pakistan", "flag_pl",
            "st_pierre_miquelon", "pitcairn_islands", "puerto_rico", "palestinian_territories",
            "portugal", "flag_pw", "paraguay", "flag_qa", "flag_re", "flag_ro", "flag_rs",
            "flag_ru", "flag_rw", "saudi_arabia", "solomon_islands", "seychelles", "flag_sd",
            "flag_se", "singapore", "st_helena", "slovenia", "svalbard_jan_mayen", "slovakia",
            "sierra_leone", "san_marino", "flag_sn", "flag_so", "suriname", "south_sudan",
            "sao_tome_principe", "el_salvador", "sint_maarten", "flag_sy", "flag_sz",
            "tristan_da_cunha", "turks_caicos_islands", "flag_td", "french_southern_territories",
            "flag_tg", "thailand", "tajikistan", "flag_tk", "timor_leste", "turkmenistan",
            "flag_tn", "flag_to", "flag_tr", "trinidad_tobago", "flag_tv", "flag_tw",
            "tanzania", "flag_ua", "flag_ug", "us_outlying_islands", "united_nations",
            "flag_us", "flag_uy", "uzbekistan", "vatican_city", "st_vincent_grenadines",
            "venezuela", "british_virgin_islands", "us_virgin_islands", "flag_vn", "flag_vu",
            "wallis_futuna", "flag_ws", "kosovo", "flag_ye", "flag_yt", "south_africa",
            "flag_zm", "zimbabwe", "flag_england", "flag_scotland", "flag_wales"
        ]),
    ];
    
    let mut categories = Vec::new();
    for (name, emoji_names) in raw_categories {
        let mut emojis = Vec::new();
        for emoji_name in emoji_names {
            if let Some(unicode) = emoji_map.get(emoji_name) {
                emojis.push(Emoji {
                    name: emoji_name.to_string(),
                    unicode: unicode.clone(),
                });
            }
        }
        categories.push(Category {
            name: name.to_string(),
            emojis,
        });
    }
    
    categories
}

fn create_emoji_map() -> HashMap<String, String> {
    let mut map = HashMap::new();
    
    // Add all the emoji mappings from the provided data
    map.insert("grinning".to_string(), "😀".to_string());
    map.insert("smile".to_string(), "😄".to_string());
    map.insert("happy".to_string(), "😊".to_string());
    map.insert("grin".to_string(), "😁".to_string());
    map.insert("amused".to_string(), "😏".to_string());
    map.insert("sweat_smile".to_string(), "😅".to_string());
    map.insert("rolling_on_the_floor_laughing".to_string(), "🤣".to_string());
    map.insert("haha".to_string(), "😂".to_string());
    map.insert("slightly_smiling_face".to_string(), "🙂".to_string());
    map.insert("upside_down_face".to_string(), "🙃".to_string());
    map.insert("wink".to_string(), "😉".to_string());
    map.insert("blush".to_string(), "😊".to_string());
    map.insert("innocent".to_string(), "😇".to_string());
    map.insert("smiling_face_with_three_hearts".to_string(), "🥰".to_string());
    map.insert("heart_eyes".to_string(), "😍".to_string());
    map.insert("grinning_face_with_star_eyes".to_string(), "🤩".to_string());
    map.insert("kissing_heart".to_string(), "😘".to_string());
    map.insert("kissing".to_string(), "😗".to_string());
    map.insert("relaxed".to_string(), "☺️".to_string());
    map.insert("kissing_closed_eyes".to_string(), "😚".to_string());
    map.insert("kissing_smiling_eyes".to_string(), "😙".to_string());
    map.insert("tear_smile".to_string(), "🥲".to_string());
    map.insert("savour".to_string(), "😋".to_string());
    map.insert("stuck_out_tongue".to_string(), "😛".to_string());
    map.insert("stuck_out_tongue_winking_eye".to_string(), "😜".to_string());
    map.insert("grinning_face_with_one_large_and_one_small_eye".to_string(), "🤪".to_string());
    map.insert("stuck_out_tongue_closed_eyes".to_string(), "😝".to_string());
    map.insert("money_mouth_face".to_string(), "🤑".to_string());
    map.insert("hugging_face".to_string(), "🤗".to_string());
    map.insert("smiling_face_with_smiling_eyes_and_hand_covering_mouth".to_string(), "🤭".to_string());
    map.insert("face_with_finger_covering_closed_lips".to_string(), "🤫".to_string());
    map.insert("thinking_face".to_string(), "🤔".to_string());
    map.insert("zipper_mouth_face".to_string(), "🤐".to_string());
    map.insert("face_with_one_eyebrow_raised".to_string(), "🤨".to_string());
    map.insert("neutral_face".to_string(), "😐".to_string());
    map.insert("expressionless".to_string(), "😑".to_string());
    map.insert("no_mouth".to_string(), "😶".to_string());
    map.insert("smirk".to_string(), "😏".to_string());
    map.insert("unamused".to_string(), "😒".to_string());
    map.insert("face_with_rolling_eyes".to_string(), "🙄".to_string());
    map.insert("grimacing".to_string(), "😬".to_string());
    map.insert("lying_face".to_string(), "🤥".to_string());
    map.insert("relieved".to_string(), "😌".to_string());
    map.insert("pensive".to_string(), "😔".to_string());
    map.insert("sleepy".to_string(), "😪".to_string());
    map.insert("drooling_face".to_string(), "🤤".to_string());
    map.insert("sleeping".to_string(), "😴".to_string());
    map.insert("mask".to_string(), "😷".to_string());
    map.insert("face_with_thermometer".to_string(), "🤒".to_string());
    map.insert("face_with_head_bandage".to_string(), "🤕".to_string());
    map.insert("nauseated_face".to_string(), "🤢".to_string());
    map.insert("face_with_open_mouth_vomiting".to_string(), "🤮".to_string());
    map.insert("sneezing_face".to_string(), "🤧".to_string());
    map.insert("overheating".to_string(), "🥵".to_string());
    map.insert("freezing".to_string(), "🥶".to_string());
    map.insert("woozy_face".to_string(), "🥴".to_string());
    map.insert("dizzy_face".to_string(), "😵".to_string());
    map.insert("shocked_face_with_exploding_head".to_string(), "🤯".to_string());
    map.insert("face_with_cowboy_hat".to_string(), "🤠".to_string());
    map.insert("partying_face".to_string(), "🥳".to_string());
    map.insert("disguised_face".to_string(), "🥸".to_string());
    map.insert("confident".to_string(), "😎".to_string());
    map.insert("nerd_face".to_string(), "🤓".to_string());
    map.insert("face_with_monocle".to_string(), "🧐".to_string());
    map.insert("confused".to_string(), "😕".to_string());
    map.insert("worried".to_string(), "😟".to_string());
    map.insert("slightly_frowning_face".to_string(), "🙁".to_string());
    map.insert("frowning_face".to_string(), "☹️".to_string());
    map.insert("open_mouth".to_string(), "😮".to_string());
    map.insert("hushed".to_string(), "😯".to_string());
    map.insert("astonished".to_string(), "😲".to_string());
    map.insert("flushed".to_string(), "😳".to_string());
    map.insert("pleading_face".to_string(), "🥺".to_string());
    map.insert("bored".to_string(), "😐".to_string());
    map.insert("anguished".to_string(), "😧".to_string());
    map.insert("fearful".to_string(), "😨".to_string());
    map.insert("cold_sweat".to_string(), "😰".to_string());
    map.insert("disappointed_relieved".to_string(), "😥".to_string());
    map.insert("cry".to_string(), "😢".to_string());
    map.insert("distressed".to_string(), "😫".to_string());
    map.insert("scream".to_string(), "😱".to_string());
    map.insert("confounded".to_string(), "😖".to_string());
    map.insert("persevere".to_string(), "😣".to_string());
    map.insert("disappointed".to_string(), "😞".to_string());
    map.insert("sweat".to_string(), "😓".to_string());
    map.insert("weary".to_string(), "😩".to_string());
    map.insert("tired_face".to_string(), "😫".to_string());
    map.insert("yawning_face".to_string(), "🥱".to_string());
    map.insert("triumph".to_string(), "😤".to_string());
    map.insert("pout".to_string(), "😡".to_string());
    map.insert("angry".to_string(), "😠".to_string());
    map.insert("serious_face_with_symbols_covering_mouth".to_string(), "🤬".to_string());
    map.insert("smiling_imp".to_string(), "😈".to_string());
    map.insert("angry_imp".to_string(), "👿".to_string());
    map.insert("skull".to_string(), "💀".to_string());
    map.insert("skull_and_crossbones".to_string(), "☠️".to_string());
    map.insert("poop".to_string(), "💩".to_string());
    map.insert("clown_face".to_string(), "🤡".to_string());
    map.insert("japanese_ogre".to_string(), "👹".to_string());
    map.insert("japanese_goblin".to_string(), "👺".to_string());
    map.insert("ghost".to_string(), "👻".to_string());
    map.insert("alien".to_string(), "👽".to_string());
    map.insert("alien_monster".to_string(), "👾".to_string());
    map.insert("robot_face".to_string(), "🤖".to_string());
    map.insert("smiling_cat".to_string(), "😺".to_string());
    map.insert("grinning_cat".to_string(), "😸".to_string());
    map.insert("joyful_cat".to_string(), "😹".to_string());
    map.insert("heart_eyes_cat".to_string(), "😻".to_string());
    map.insert("smirk_cat".to_string(), "😼".to_string());
    map.insert("kissing_cat".to_string(), "😽".to_string());
    map.insert("weary_cat".to_string(), "🙀".to_string());
    map.insert("crying_cat_face".to_string(), "😿".to_string());
    map.insert("pouting_cat".to_string(), "😾".to_string());
    map.insert("see_no_evil".to_string(), "🙈".to_string());
    map.insert("hear_no_evil".to_string(), "🙉".to_string());
    map.insert("speak_no_evil".to_string(), "🙊".to_string());
    map.insert("kiss_lips".to_string(), "💋".to_string());
    map.insert("love_letter".to_string(), "💌".to_string());
    map.insert("cupid".to_string(), "💘".to_string());
    map.insert("heart_ribbon".to_string(), "💝".to_string());
    map.insert("sparkling_heart".to_string(), "💖".to_string());
    map.insert("heartpulse".to_string(), "💗".to_string());
    map.insert("heartbeat".to_string(), "💓".to_string());
    map.insert("revolving_hearts".to_string(), "💞".to_string());
    map.insert("two_hearts".to_string(), "💕".to_string());
    map.insert("heart_decoration".to_string(), "💟".to_string());
    map.insert("heavy_heart_exclamation".to_string(), "❣️".to_string());
    map.insert("broken_heart".to_string(), "💔".to_string());
    map.insert("heart".to_string(), "❤️".to_string());
    map.insert("orange_heart".to_string(), "🧡".to_string());
    map.insert("yellow_heart".to_string(), "💛".to_string());
    map.insert("green_heart".to_string(), "💚".to_string());
    map.insert("blue_heart".to_string(), "💙".to_string());
    map.insert("purple_heart".to_string(), "💜".to_string());
    map.insert("brown_heart".to_string(), "🤎".to_string());
    map.insert("black_heart".to_string(), "🖤".to_string());
    map.insert("white_heart".to_string(), "🤍".to_string());
    map.insert("100".to_string(), "💯".to_string());
    map.insert("anger".to_string(), "💢".to_string());
    map.insert("collision".to_string(), "💥".to_string());
    map.insert("dizzy_star".to_string(), "💫".to_string());
    map.insert("sweat_drops".to_string(), "💦".to_string());
    map.insert("dash".to_string(), "💨".to_string());
    map.insert("hole".to_string(), "🕳️".to_string());
    map.insert("bomb".to_string(), "💣".to_string());
    map.insert("speech_balloon".to_string(), "💬".to_string());
    map.insert("left_speech_bubble".to_string(), "🗨️".to_string());
    map.insert("right_anger_bubble".to_string(), "🗯️".to_string());
    map.insert("thought_balloon".to_string(), "💭".to_string());
    map.insert("zzz".to_string(), "💤".to_string());
    
    // Add some basic people emojis
    map.insert("wave".to_string(), "👋".to_string());
    map.insert("raised_hand".to_string(), "✋".to_string());
    map.insert("victory".to_string(), "✌️".to_string());
    map.insert("thumbsup".to_string(), "👍".to_string());
    map.insert("thumbsdown".to_string(), "👎".to_string());
    map.insert("clap".to_string(), "👏".to_string());
    map.insert("pray".to_string(), "🙏".to_string());
    map.insert("man".to_string(), "👨".to_string());
    map.insert("woman".to_string(), "👩".to_string());
    map.insert("baby".to_string(), "👶".to_string());
    map.insert("boy".to_string(), "👦".to_string());
    map.insert("girl".to_string(), "👧".to_string());
    
    // Add some basic animals
    map.insert("monkey_face".to_string(), "🐵".to_string());
    map.insert("dog_face".to_string(), "🐶".to_string());
    map.insert("cat_face".to_string(), "🐱".to_string());
    map.insert("cow_face".to_string(), "🐮".to_string());
    map.insert("pig_face".to_string(), "🐷".to_string());
    
    // Add some basic food
    map.insert("coffee".to_string(), "☕".to_string());
    map.insert("apple".to_string(), "🍎".to_string());
    map.insert("banana".to_string(), "🍌".to_string());
    map.insert("pizza".to_string(), "🍕".to_string());
    map.insert("hamburger".to_string(), "🍔".to_string());
    
    // Add some basic travel
    map.insert("umbrella_with_rain_drops".to_string(), "☔".to_string());
    map.insert("car".to_string(), "🚗".to_string());
    map.insert("airplane".to_string(), "✈️".to_string());
    map.insert("house".to_string(), "🏠".to_string());
    
    // Add some basic activities
    map.insert("sparkles".to_string(), "✨".to_string());
    map.insert("soccer".to_string(), "⚽".to_string());
    map.insert("basketball".to_string(), "🏀".to_string());
    map.insert("tennis".to_string(), "🎾".to_string());
    
    // Add some basic objects
    map.insert("eyeglasses".to_string(), "👓".to_string());
    map.insert("phone".to_string(), "📱".to_string());
    map.insert("computer".to_string(), "💻".to_string());
    map.insert("watch".to_string(), "⌚".to_string());
    
    // Add some basic symbols
    map.insert("aries".to_string(), "♈".to_string());
    map.insert("taurus".to_string(), "♉".to_string());
    map.insert("gemini".to_string(), "♊".to_string());
    map.insert("cancer".to_string(), "♋".to_string());
    map.insert("leo".to_string(), "♌".to_string());
    map.insert("virgo".to_string(), "♍".to_string());
    map.insert("libra".to_string(), "♎".to_string());
    map.insert("scorpius".to_string(), "♏".to_string());
    map.insert("sagittarius".to_string(), "♐".to_string());
    map.insert("capricorn".to_string(), "♑".to_string());
    map.insert("aquarius".to_string(), "♒".to_string());
    map.insert("pisces".to_string(), "♓".to_string());
    
    // Add some basic flags
    map.insert("checkered_flag".to_string(), "🏁".to_string());
    map.insert("rainbow_flag".to_string(), "🏳️‍🌈".to_string());
    map.insert("pirate_flag".to_string(), "🏴‍☠️".to_string());
    map.insert("flag_us".to_string(), "🇺🇸".to_string());
    map.insert("flag_gb".to_string(), "🇬🇧".to_string());
    map.insert("flag_fr".to_string(), "🇫🇷".to_string());
    map.insert("flag_de".to_string(), "🇩🇪".to_string());
    map.insert("flag_jp".to_string(), "🇯🇵".to_string());
    map.insert("flag_kr".to_string(), "🇰🇷".to_string());
    map.insert("flag_cn".to_string(), "🇨🇳".to_string());
    
    map
}
