# Import micro: bit modules
from microbit import *
from random import randrange
import music
    from collections import OrderedDict

moveTimer = 0
playerMoveSpeed = 2 #higher is slower

fallTimer = 0
fallingSpeed = 5 #higher is slower

inPosition = False

placedTiles = []
checkTiles = []

rowDown = False

tune = ["F4:4", "D4:4", "B3:4"]
tune2 = ["F4:1", "A4:2"]

# Tile object
class Tile:
def __init__(self, x, y):
self.x = x
self.y = y

  # Function to move in a direction
def move(self, direction):

if (direction == "right"):
        
        # Prevent the tile moving off the screen on the right side
if (self.x < 4):
    self.x += 1

if (direction == "left"):
        
        # Prevent the tile moving off the screen at the other side(left)
if (self.x > 0):
    self.x -= 1

floatingTile = Tile(randrange(5), 0)

gameOver = False

# Gameloop
while True:
    if (gameOver == False):
        moveTimer += 1
fallTimer += 1

        # Rotate tile
if button_a.is_pressed() and button_b.is_pressed():
print("Rotate tile.")

        # Player input(move left and right)
elif button_a.is_pressed() and moveTimer > playerMoveSpeed:
floatingTile.move("left")
moveTimer = 0

elif button_b.is_pressed() and moveTimer > playerMoveSpeed:
floatingTile.move("right")
moveTimer = 0
        
        # Move tile down slowly
if fallTimer > fallingSpeed and floatingTile.y != 4:
            
            # Move the tile one position down
floatingTile.y += 1

fallTimer = 0

inPosition = False #reset variable

        # Check tiles for collusions
        for tile in placedTiles:

            # Check if above other tile
if (tile[0] == floatingTile.x and tile[1] == floatingTile.y + 1):
inPosition = True           

        # When above another tile, or at ground level, stop and spawn an new tile
if (inPosition == True or floatingTile.y == 4):

            # Add current tile to array with placed tiles
placedTiles.append([floatingTile.x, floatingTile.y])

            # Spawn an new tile
floatingTile.y = 0
floatingTile.x = randrange(5)

music.pitch(500, 10)

checkedTiles = []
rowDown = False

        # Check for full row
        for tile in placedTiles:
        if tile[1] == 4:
            checkedTiles.append(tile[1])

        # If there is a full row, remove it and move the rest down one position
if len(checkedTiles) == 5:

            # Nice sound effect
music.play(tune2)

            # Remove old row
for tile in placedTiles[:]:
if tile[1] == 4:
    placedTiles.remove(tile)
            
            # Move other rows down one pixel
for index, tile in enumerate(placedTiles):
    placedTiles[index][1] += 1

        # Clear screen to draw frame
display.clear()

        # Display the placed tiles
for tile in placedTiles:
    display.set_pixel(tile[0], tile[1], 7)

if (tile[1] == 0):
    gameOver = True

        # Display the floating tile
display.set_pixel(floatingTile.x, floatingTile.y, 9)

        # Remove duplicates from array of placed tiles
        # placedTiles = OrderedDict((tuple(x), x) for x in placedTiles).values()

        # A bit of input delay to prevent movement at warp speed
sleep(100)

    else:

display.show(Image.SILLY)

sleep(500)

music.play(tune)

sleep(1200)

moveTimer = 0
fallTimer = 0
inPosition = False
placedTiles = []

gameOver = False