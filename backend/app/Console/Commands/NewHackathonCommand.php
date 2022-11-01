<?php

namespace App\Console\Commands;

use App\Models\Developer;
use App\Models\Development;
use App\Models\Hackathon;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\HttpClientKernel;

class NewHackathonCommand extends Command
{
    const USER_URL = 'https://randomuser.me/api';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'new-hackathon:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates new hackathon with its 10 best developers and developments';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Log::info('Cron is working fine');

        $hackathon = new Hackathon();

        $hackathon->name = 'Hackathon ' . date('Y-m-d H:i:s');
        $hackathon->place = 'Mordor';
        $hackathon->held_in = date('Y-m-d H:i:s');
        $hackathon->save();

        for ($i=0; $i < 10; $i++) { 
            $client = new Client();
            $response = $client->request('GET', self::USER_URL);
    
            $responseBody = json_decode($response->getBody());

            Log::info('user response:' . $responseBody->results[0]->gender, ['user' => $responseBody->results[0]]);

            $developer = new Developer();
            $developer->first_name = $responseBody->results[0]->name->first;
            $developer->last_name = $responseBody->results[0]->name->last;
            $developer->email = $responseBody->results[0]->email;
            $developer->phone = $responseBody->results[0]->phone;
            $developer->total_points = $i + 1; // points have a count from 1 onwards while i begins from 0
            $developer->profile_thumbnail = $responseBody->results[0]->picture->thumbnail;

            $developer->save();

            $hackathon->developers()->attach($developer->id);

            $development = new Development();
            $development->name = 'Development rank ' . (10 - $i);
            $development->description = 'Development ' . (10 - $i) . ' description';
            // rank value is inverse to total points. Rank 10 = 1 point to user... rank 1 = 10 points to user
            $development->rank = 10 - $i;
            $development->hackathon_id = $hackathon->id;
            $development->developer_id = $developer->id;

            $development->save();
        }
        return 0;
    }
}
