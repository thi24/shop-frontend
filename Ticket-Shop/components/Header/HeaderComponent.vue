    <template>

        <header class="bg-white bg-[radial-gradient(ellipse_100%_100%_at_10%_10%,rgba(0,152,228,0.42),rgba(255,255,255,0))] shadow py-2 fixed: top-0 start-0">
            <div class="flex flex-wrap justify-between items-center mx-auto ">
                <div class="flex items-center space-x-1">
                <h1 class=" px-10 text-4xl font-bold leading-6">Benevolo-Shop wiederweg</h1>
                </div>
            <div class="p-4 flex justify-center ">
                <form class="max-w-md mx-auto">   
                    <label for="search-events" class=" mb-2text-sm font-medium text-black sr-only dark:text-white">Search-Bar</label>
                    <div class="relative ">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-white-500 dark:text-white-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="search-events" class=" px-8 block w-full p-2 ps-10 text-sm border focus:outline-none rounded-full bg-white dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Events" required />
                    </div>
                </form>
            </div>
        </div>
        </header>
    </template>
    
    
    <script lang="ts" setup>
    
    
    </script>

  