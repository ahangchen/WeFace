$(function() {
                                        var tabhosts = $(".four a");
                                        
                                        tabhosts.each(function() {
                                                                        $($(this).attr("href")).hide();
                                                                        
                                                                        if ($(this).hasClass("selected")) {
                                                                        $($(this).attr("href")).show();
                                                                       $(this).parent() .css("border-bottom","5px black solid");
                                                                        }
                                                                        
                                        $(this).click(function(event) {
                                        event.preventDefault();
                                        
                                        if (!$(this).hasClass("selected")) {
                                        tabhosts.each(function() {
                                        $(this).removeClass("selected");
                                        $($(this).attr("href")).hide();
                                         $(this).parent() .css("border-bottom","");
                                        });
                                        
                                        $(this).addClass("selected");
                                        $($(this).attr("href")).show();
                                         $(this).parent() .css("border-bottom","5px black solid");
                                        }
                                        });
                                        });
                             });