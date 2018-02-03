defmodule Awful.Favicon do

    import Ecto.Query, warn: false
    alias Ac.Repo
    
    def generate_favicon do
        api_key = "blah"
        master_picture = Base.encode64(File.read! (Path.join("#{:code.priv_dir(:my_app)}", "AV.png")))

        json = ~s({
                    "favicon_generation": {
                        "api_key": "#{api_key}",
                        "master_picture": {
                            "type": "inline", 
                            "url": "#{}"
                        },
                        "files_location": {
                            "type": "path",
                            "path": "/path/to/icons"
                        },
                        "favicon_design": {
                            "desktop_browser": {},
                            "ios": {
                                "picture_aspect": "background_and_margin",
                                "margin": "4",
                                "background_color": "#123456",
                                "startup_image": {
                                    "master_picture": {
                                        "type": "url",
                                        "url": "http://example.com/pic_for_ios_startup.png"
                                    },
                                    "background_color": "#654321"
                                },
                                "assets": {
                                    "ios6_and_prior_icons": false,
                                    "ios7_and_later_icons": true,
                                    "precomposed_icons": false,
                                    "declare_only_default_icon": true
                                }
                            },
                            "windows": {
                                "picture_aspect": "white_silhouette",
                                "background_color": "#654321",
                                "assets": {
                                    "windows_80_ie_10_tile": true,
                                    "windows_10_ie_11_edge_tiles": {
                                        "small": false,
                                        "medium": true,
                                        "big": true,
                                        "rectangle": false
                                    }
                                }
                            },
                            "firefox_app": {
                                "picture_aspect": "circle",
                                "keep_picture_in_circle": "true",
                                "circle_inner_margin": "5",
                                "background_color": "#456789",
                                "manifest": {
                                    "app_name": "My sample app",
                                    "app_description": "Yet another sample application",
                                    "developer_name": "Philippe Bernard",
                                    "developer_url": "http://stackoverflow.com/users/499917/philippe-b"
                                }
                            },
                            "android_chrome": {
                                "picture_aspect": "shadow",
                                "manifest": {
                                    "name": "My sample app",
                                    "display": "standalone",
                                    "orientation": "portrait",
                                    "start_url": "/homepage.html",
                                    "existing_manifest": "{\"name\": \"Yet another app\"}"
                                },
                                "assets": {
                                    "legacy_icon": true,
                                    "low_resolution_icons": false
                                },
                                "theme_color": "#4972ab"
                            },
                            "safari_pinned_tab": {
                                "picture_aspect": "black_and_white",
                                "threshold": 60,
                                "theme_color": "#136497",
                            },
                            "coast": {
                                "picture_aspect": "background_and_margin",
                                "background_color": "#136497",
                                "margin": "12%"
                            },
                            "open_graph": {
                                "picture_aspect": "background_and_margin",
                                "background_color": "#136497",
                                "margin": "12%",
                                "ratio": "1.91:1",
                            },
                            "yandex_browser": {
                                "background_color": "background_color",
                                "manifest": {
                                    "show_title": true,
                                    "version": "1.0"
                                }
                            }
                        },
                        "settings": {
                            "compression": "3",
                            "scaling_algorithm": "Mitchell",
                            "error_on_image_too_small": true
                        },
                        "versioning": {
                            "param_name": "ver",
                            "param_value": "15Zd8"
                        }
                    }
                })
    

    end

end