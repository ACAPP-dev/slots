# Slot Machine Javascript Based Web App

Play a 'realistic' slot machine using your browser.  This slot machine has much better odds than a traditional slot machine in Las Vegas.  See how high you can get your balance!

## Features

<ul>
    <li>Create an account with a username and password.</li>
    <li>Make pretend deposits and withdrawals.</li>
    <li>Adjust bet amount.</li>
    <li>Spin to win!</li>
    <li>View last 5 transactions (deposits and withdrawals).</li>
    <li>View payout table.</li>
</ul>

Please use the following link to see an overview of the webapp on YouTube: https://youtu.be/9v5WjbOkbS4

My blog also talks about this project here: need

## Installation

Written with Ruby version 2.6.1p33 using Javascript and Ruby on Rails API Framework.

Uses a Sqlite3 database.  To refresh or set up the database, use the following steps:

    $ rails db:drop

    $ rails db:migrate

    $ rails db:seed


Download the code for this webapp using:

    $ git clone https://github.com/ACAPP-dev/slots.git

Update Gem files using command:

    $ bundle install 
    
    or
    
    $ bundle update

## Development

    You can use:
    
    $ rails s
            
    to start webserver.
    
    Use:

    $ rails c

    to enter a console session for debugging and/or exploring.

    Start Webpage (from project directory):

    $ open frontend/index.html

## Contributing

Bug reports and pull requests are welcome on GitHub at need. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

Written by **Andrew Capp** in conjunction with _Flatiron Academy_ - June 2020

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/ACAPP-dev/slots/blob/master/CODE_OF_CONDUCT.md).